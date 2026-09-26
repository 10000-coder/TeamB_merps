#!/usr/bin/env python3
"""Verify the port's scroll/entrance motion against the reference's own implementation.

Every expectation here was read out of the reference's shipped bundle (module 9763
of chunk `0h3b5g8_u9es3.js`, plus the header's menu module). The point is to test
BEHAVIOUR, which a pixel diff of a settled page cannot see:

  1. Lenis smooth scroll is attached and the wheel is damped (not an instant jump)
  2. lines below the fold start hidden (translateY(110%) / opacity 0)
  3. scrolling one into view reveals it with the reference's exact transition and a
     70ms-per-line stagger
  4. the hero coin runs `hero-logo-coin 20s infinite` with its inline rotation cleared
  5. the marquee runs `marqyL 12.8s` (pure CSS)
  6. the "How it works" panel tracks the viewport centre and responds to clicks
  7. the mobile menu: hamburger rotates, text rolls, visibility flips IMMEDIATELY
     (not after the closed state's 500ms delay), scroll lock applied
  8. the theme toggle runs the sweep view transition
  9. prefers-reduced-motion short-circuits all of it

Usage: python3 tools/verify_motion.py --root app/dist [--json out.json]
"""
import argparse
import functools
import http.server
import json
import socketserver
import threading
import time

from playwright.sync_api import sync_playwright

RESULTS = []


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serve(root):
    handler = functools.partial(Quiet, directory=root)
    httpd = socketserver.TCPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


def check(name, ok, detail=''):
    RESULTS.append({'check': name, 'pass': bool(ok), 'detail': str(detail)[:400]})
    print('%-4s %-46s %s' % ('PASS' if ok else 'FAIL', name, str(detail)[:170]))


# Classify by STYLE, not by position: an entrance that never fired is hidden no
# matter where it sits, and a reduced-motion page is revealed everywhere.
MASK_STATE = r"""
() => {
  const els = [...document.querySelectorAll('[data-animated-text-mask]')];
  const vh = window.innerHeight;
  let rendered = 0, unrendered = 0, below = 0, inView = 0;
  let hiddenAnywhere = 0, hiddenInView = 0, sample = null;
  for (const el of els) {
    const line = el.firstElementChild;
    if (!line) continue;
    // The reference renders four layout variants and hides three with CSS. Those
    // live in display:none subtrees, where the rect is 0,0 and getComputedStyle
    // returns the SPECIFIED value -- counting them would be a false positive.
    if (el.getClientRects().length === 0) { unrendered++; continue; }
    rendered++;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(line);
    const identity = cs.transform === 'none' || /matrix\(1, 0, 0, 1, 0, 0\)/.test(cs.transform);
    const isHidden = cs.opacity === '0' || !identity;
    const belowFold = r.top > vh;
    if (belowFold) below++; else inView++;
    if (isHidden) {
      hiddenAnywhere++;
      if (!belowFold) hiddenInView++;
      if (!sample) sample = { opacity: cs.opacity, transform: cs.transform,
                              text: (line.textContent || '').slice(0, 30) };
    }
  }
  return { total: els.length, rendered, unrendered, below, inView,
           hiddenAnywhere, hiddenInView, sample };
}
"""

def reset_scroll(pg):
    """Return to the top and WAIT for it.

    Lenis keeps animating toward its own target, so a single `window.scrollTo(0,0)`
    can be pulled back before the next measurement -- which would silently shift
    every viewport-relative rect. Poll until it is actually at zero.
    """
    for _ in range(40):
        if pg.evaluate('window.scrollY') == 0:
            return True
        pg.evaluate('window.scrollTo(0, 0)')
        pg.wait_for_timeout(100)
    return pg.evaluate('window.scrollY') == 0

LINE_STATE = r"""
(text) => {
  const el = [...document.querySelectorAll('[data-animated-text-mask]')]
    .find(e => (e.firstElementChild.textContent || '').trim().startsWith(text));
  if (!el) return null;
  const cs = getComputedStyle(el.firstElementChild);
  return { opacity: cs.opacity, transform: cs.transform };
}
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--root', default='app/dist')
    ap.add_argument('--path', default='/index.html')
    ap.add_argument('--json', default='')
    args = ap.parse_args()

    httpd, port = serve(args.root)
    url = 'http://127.0.0.1:%d%s' % (port, args.path)
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(args=['--no-sandbox', '--disable-dev-shm-usage'])

            # ---------- desktop ----------
            ctx = b.new_context(viewport={'width': 1440, 'height': 900})
            pg = ctx.new_page()
            pg.goto(url, wait_until='load', timeout=90000)
            pg.wait_for_timeout(1500)

            # 1. damping: a wheel event must move the page gradually, not instantly
            reset_scroll(pg)
            pg.wait_for_timeout(300)
            pg.mouse.move(720, 450)
            pg.mouse.wheel(0, 1400)
            samples = []
            t0 = time.time()
            while time.time() - t0 < 0.7:
                samples.append(pg.evaluate('window.scrollY'))
                time.sleep(0.02)
            distinct = len(set(samples))
            first, last = samples[0], samples[-1]
            damped = distinct > 5 and last > 20 and first < last * 0.5
            check('wheel is damped (Lenis), not instant', damped,
                  'distinct=%d first=%.0f last=%.0f samples=%s'
                  % (distinct, first, last, samples[:6]))
            html_cls = pg.evaluate('document.documentElement.className')
            check('html carries lenis classes while scrolling',
                  'lenis' in html_cls, html_cls)

            reset_scroll(pg)
            pg.wait_for_timeout(1200)

            # 2. entrances start hidden below the fold
            st = pg.evaluate(MASK_STATE)
            check('mask elements found', st['total'] == 108, 'total=%d' % st['total'])
            check('below-fold lines start hidden, none hidden in view',
                  st['hiddenAnywhere'] > 0 and st['hiddenInView'] == 0,
                  'rendered=%d hidden=%d hiddenInView=%d sample=%s'
                  % (st['rendered'], st['hiddenAnywhere'], st['hiddenInView'], st['sample']))
            check('hidden state is translateY(110%) / opacity 0',
                  st['sample'] and st['sample']['opacity'] == '0'
                  and 'matrix' in st['sample']['transform'],
                  st['sample'])

            # 3. scrolling one into view reveals it, with the reference's timing
            # Pick a line that is STILL hidden and part of a multi-line group: the
            # damping test already scrolled past the top of the page, so an
            # arbitrary below-fold element may have been revealed already (its
            # inline transition is restored away once the entrance finishes).
            target = pg.evaluate("""() => {
              const els=[...document.querySelectorAll('[data-animated-text-mask]')];
              let fallback = null;
              for (const el of els) {
                if (el.getClientRects().length === 0) continue;
                const r = el.getBoundingClientRect();
                if (r.top <= window.innerHeight) continue;
                const line = el.firstElementChild;
                if (getComputedStyle(line).opacity !== '0') continue;
                const group = el.closest('[data-text]');
                const n = group ? group.querySelectorAll('[data-animated-text-mask]').length : 1;
                const rec = { y: Math.round(r.top + window.scrollY - 200),
                              text: (line.textContent || '').trim().slice(0, 20),
                              groupLines: n };
                if (n >= 2) return rec;
                fallback = fallback || rec;
              }
              return fallback;
            }""")
            if target is None:
                check('found a still-hidden line to scroll to', False, 'none hidden below fold')
            pg.evaluate('window.scrollTo(0, %d)' % target['y'])
            pg.wait_for_timeout(180)
            mid = pg.evaluate("""() => {
              const out=[];
              for (const el of document.querySelectorAll('[data-animated-text-mask]')) {
                const s=el.firstElementChild.getAttribute('style')||'';
                if (s.includes('900ms')) out.push(s);
              }
              return out.slice(0, 3);
            }""")
            check('reveal transition matches the reference',
                  bool(mid) and all('transform 900ms cubic-bezier(0.16, 1, 0.3, 1)' in m
                                    and 'opacity 450ms linear' in m for m in mid),
                  mid[:1])
            delays = sorted({int(m.split('transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ')[1].split('ms')[0])
                             for m in mid})
            check('per-line stagger is a 70ms multiple (not 0)',
                  (any(d > 0 and d % 70 == 0 for d in delays)) or target['groupLines'] < 2,
                  'delays=%s groupLines=%s' % (delays, target['groupLines']))
            pg.wait_for_timeout(1700)
            settled = pg.evaluate(LINE_STATE, target['text'])
            check('scrolled-to line settles visible',
                  settled and settled['opacity'] == '1'
                  and (settled['transform'] == 'none'
                       or 'matrix(1, 0, 0, 1, 0, 0)' in settled['transform']),
                  '%s -> %s' % (target['text'], settled))

            # 4. hero coin
            coin = pg.evaluate("""() => {
              const c=document.querySelector('.transform-3d.origin-center');
              if (!c) return null;
              const cs=getComputedStyle(c);
              return { cls:c.className, inline:c.getAttribute('style'),
                       anim:cs.animationName, dur:cs.animationDuration, iter:cs.animationIterationCount };
            }""")
            check('hero coin animates 20s infinite, inline rotation cleared',
                  coin and coin['anim'] == 'hero-logo-coin' and coin['dur'] == '20s'
                  and coin['iter'] == 'infinite'
                  and 'animate-hero-logo-coin' in coin['cls']
                  and not (coin['inline'] or '').strip(),
                  coin)

            # 5. marquee (pure CSS, no JS needed)
            mq = pg.evaluate("""() => {
              const m=document.querySelector('[data-marqy-content]');
              if (!m) return null;
              const cs=getComputedStyle(m);
              return { name:cs.animationName, dur:cs.animationDuration, state:cs.animationPlayState };
            }""")
            check('marquee runs marqyL 12.8s', mq and mq['name'] == 'marqyL'
                  and mq['dur'] == '12.8s' and mq['state'] == 'running', mq)

            # 6. "How it works" panel
            top = pg.evaluate("""() => {
              const c=document.getElementById('clients');
              const btns=[...c.querySelectorAll('ul[aria-label="How it works"] li > button')];
              return btns.findIndex(b=>b.className.includes('text-theme-bg'));
            }""")
            check('clients stage at scroll top is 0 (matches live site)', top == 0, 'stage=%d' % top)
            pg.evaluate("""() => {
              const c=document.getElementById('clients');
              c.querySelectorAll('ul[aria-label="How it works"] li > button')[3].click();
            }""")
            pg.wait_for_timeout(900)
            cs3 = pg.evaluate("""() => {
              const c=document.getElementById('clients');
              const btns=[...c.querySelectorAll('ul[aria-label="How it works"] li > button')];
              const stacks=[...c.querySelectorAll('.relative.overflow-hidden')].map(s=>{
                const f=s.querySelector(':scope > .flex.flex-col');
                const sr=s.querySelector(':scope > .sr-only');
                return (f && f.childElementCount===btns.length)
                  ? { tf:f.style.transform, sr: sr ? sr.textContent : null } : null;
              }).filter(Boolean);
              return { active: btns.findIndex(b=>b.className.includes('text-theme-bg')),
                       stacks: stacks,
                       scaleY: btns.map(b=>b.firstElementChild.className.includes('scale-y-100')),
                       h3: btns[3].querySelector('h3').textContent.trim() };
            }""")
            labelled = [s for s in cs3['stacks'] if s['sr'] is not None]
            check('clicking a step activates it, rolls the caption and the caption label',
                  cs3['active'] == 3
                  and any(s['tf'] == 'translateY(-3em)' for s in cs3['stacks'])
                  and labelled and all(s['sr'] == cs3['h3'] for s in labelled)
                  and cs3['scaleY'][3] is True and sum(cs3['scaleY']) == 1,
                  'active=%s h3=%r transforms=%s scaleY=%s'
                  % (cs3['active'], cs3['h3'], [s['tf'] for s in cs3['stacks']], cs3['scaleY']))

            # 8. theme sweep
            sweep = pg.evaluate("""() => {
              const b=document.querySelector('button[aria-label="Toggle theme"]');
              const before=document.documentElement.dataset.theme;
              const supported = typeof document.startViewTransition === 'function';
              b.click();
              return { supported, before };
            }""")
            pg.wait_for_timeout(60)
            after = pg.evaluate("""() => ({
              theme: document.documentElement.dataset.theme,
              sweep: document.documentElement.className.match(/theme-sweep-\\w+/g) || []
            })""")
            check('theme toggle flips data-theme', after['theme'] != sweep['before'],
                  '%s -> %s' % (sweep['before'], after['theme']))
            check('theme sweep view transition class applied',
                  (not sweep['supported']) or bool(after['sweep']),
                  'startViewTransition=%s classes=%s' % (sweep['supported'], after['sweep']))
            ctx.close()

            # ---------- mobile: the menu ----------
            ctx2 = b.new_context(viewport={'width': 375, 'height': 812})
            pg2 = ctx2.new_page()
            pg2.goto(url, wait_until='load', timeout=90000)
            pg2.wait_for_timeout(1500)
            pg2.click('header button[aria-controls]')
            pg2.wait_for_timeout(60)          # sample BEFORE the 400ms entrance lands
            menu = pg2.evaluate("""() => {
              const btn=document.querySelector('header button[aria-controls]');
              const roller=btn.querySelector('.flex.flex-col.transition-transform');
              const spans=[...btn.querySelectorAll('span.absolute.origin-center')].map(s=>s.style.transform);
              const root=document.getElementById('site-mobile-menu');
              const cs=getComputedStyle(root);
              return { expanded: btn.getAttribute('aria-expanded'),
                       controls: btn.getAttribute('aria-controls'),
                       roller: roller ? roller.style.transform : null,
                       spans, visibility: cs.visibility, opacity: cs.opacity,
                       locked: document.documentElement.classList.contains('lenis-stopped'),
                       links: [...root.querySelectorAll('a')].slice(0,2).map(a=>a.style.transition) };
            }""")
            check('menu opens: aria + hamburger rotates to an X',
                  menu['expanded'] == 'true' and menu['controls'] == 'site-mobile-menu'
                  and 'rotate(45deg)' in (menu['spans'][0] or '')
                  and 'rotate(-45deg)' in (menu['spans'][1] or ''),
                  'spans=%s' % menu['spans'])
            check('menu text rolls to "Close"', menu['roller'] == 'translateY(-1em)', menu['roller'])
            check('menu becomes visible immediately, not after 500ms',
                  menu['visibility'] == 'visible', 'visibility=%s opacity=%s'
                  % (menu['visibility'], menu['opacity']))
            check('scroll locked while the menu is open', menu['locked'], menu['locked'])
            check('menu links carry the 120/190ms stagger',
                  any('120ms' in (l or '') for l in menu['links'])
                  and any('190ms' in (l or '') for l in menu['links']),
                  menu['links'])
            pg2.click('header button[aria-controls]')
            pg2.wait_for_timeout(700)
            closed = pg2.evaluate("""() => ({
              expanded: document.querySelector('header button[aria-controls]').getAttribute('aria-expanded'),
              locked: document.documentElement.classList.contains('lenis-stopped')
            })""")
            check('menu closes and unlocks scroll',
                  closed['expanded'] == 'false' and not closed['locked'], closed)
            ctx2.close()

            # ---------- reduced motion ----------
            ctx3 = b.new_context(viewport={'width': 1440, 'height': 900}, reduced_motion='reduce')
            pg3 = ctx3.new_page()
            pg3.goto(url, wait_until='load', timeout=90000)
            pg3.wait_for_timeout(1200)
            rm = pg3.evaluate(MASK_STATE)
            check('prefers-reduced-motion: nothing is left hidden',
                  rm['hiddenAnywhere'] == 0 and rm['total'] == 108,
                  'hiddenAnywhere=%d rendered=%d total=%d'
                  % (rm['hiddenAnywhere'], rm['rendered'], rm['total']))
            coin3 = pg3.evaluate("""() => {
              const c=document.querySelector('.transform-3d.origin-center');
              return c ? c.className.includes('animate-hero-logo-coin') : null;
            }""")
            check('prefers-reduced-motion: coin animation not started', coin3 is False, coin3)
            ctx3.close()
            b.close()
    finally:
        httpd.shutdown()

    failed = [r for r in RESULTS if not r['pass']]
    print()
    print('%d/%d checks passed' % (len(RESULTS) - len(failed), len(RESULTS)))
    if args.json:
        with open(args.json, 'w') as f:
            json.dump({'results': RESULTS}, f, indent=1)
        print('wrote', args.json)
    return 1 if failed else 0


if __name__ == '__main__':
    raise SystemExit(main())
