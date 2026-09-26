#!/usr/bin/env python3
"""Verify the state the page settles into AFTER a full scroll -- the two effects a
settled-screen pixel diff cannot see.

Both checks exist because of real bugs found while porting:

  1. COUNTERS. The reference's count-up module forces every roller column to
     digit 0 on mount and animates it to its value when it scrolls into view, and
     it never restores anything. Our port snapshotted the column's inline style
     AFTER zeroing it and restored that snapshot 1.46s later -- so each counter
     animated 0 -> n and then snapped back to 0. Visually the stats read 0.
     Nothing else caught it: the pixel baseline is a pre-hydration render, so it
     holds the correct digit and the diff just looked like "drift".

  2. MASKS. A line still hidden after the whole document has been scrolled means
     the reveal never fired for it. Lines inside a `display:none` subtree are
     excluded on purpose: those can never intersect, and the reference's own
     observer cannot reveal them either -- so that is parity, not a defect.

Usage:
  python3 tools/verify_counters.py --root app/dist [--width 1440] [--width 375]
                                   [--json out.json]
"""
import argparse
import functools
import http.server
import json
import socketserver
import threading

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
    print('%-4s %-52s %s' % ('PASS' if ok else 'FAIL', name, str(detail)[:150]))


# A "rendered" element is one with at least one client rect: this is what
# excludes everything inside a `display:none` responsive variant.
POST_WALK = r"""
() => {
  const rendered = el => el.getClientRects().length > 0;
  const out = { counters: [], masks: { total: 0, rendered: 0, hidden: 0, sample: null } };

  for (const el of document.querySelectorAll('span.relative.inline-block.overflow-hidden')) {
    if (el.closest('time') || el.closest('#clients') || el.closest('#testimonials')) continue;
    if (!rendered(el)) continue;
    const col = el.querySelector(':scope > .absolute.top-0.flex.flex-col');
    const inv = el.querySelector(':scope > .invisible');
    if (!col || !inv) continue;
    const target = (inv.textContent || '').trim();
    const m = /translateY\(-([\d.]+)em\)/.exec(col.style.transform || '');
    const shown = m ? Number(m[1]) : (col.style.transform === 'none' ? 0 : NaN);
    out.counters.push({
      target: target, shown: shown, ok: String(shown) === String(Number(target)),
      transition: col.style.transition || '', y: Math.round(col.getBoundingClientRect().top + window.scrollY),
    });
  }

  for (const mask of document.querySelectorAll('[data-animated-text-mask]')) {
    out.masks.total++;
    if (!rendered(mask)) continue;
    out.masks.rendered++;
    const line = mask.firstElementChild;
    if (!line) continue;
    const cs = getComputedStyle(line);
    const hidden = cs.opacity !== '1' || (cs.transform !== 'none' && cs.transform !== 'matrix(1, 0, 0, 1, 0, 0)');
    if (hidden) {
      out.masks.hidden++;
      if (!out.masks.sample) {
        out.masks.sample = { text: (line.textContent || '').slice(0, 40), opacity: cs.opacity, transform: cs.transform };
      }
    }
  }
  return out;
}
"""


ROLL = r"""
async () => {
  const rendered = el => el.getClientRects().length > 0;
  const el = [...document.querySelectorAll('span.relative.inline-block.overflow-hidden')]
    .filter(e => !e.closest('time') && !e.closest('#clients') && !e.closest('#testimonials'))
    .filter(rendered)[0];
  if (!el) return { err: 'no rendered counter' };
  const col = el.querySelector(':scope > .absolute.top-0.flex.flex-col');
  const inv = el.querySelector(':scope > .invisible');
  if (!col || !inv) return { err: 'no column' };
  const px = () => {
    const m = /matrix\(([^)]+)\)/.exec(getComputedStyle(col).transform);
    return m ? Number(m[1].split(',')[5]) : 0;
  };
  el.scrollIntoView({ block: 'center' });
  const vals = [];
  for (let i = 0; i < 20; i++) { vals.push(Math.round(px())); await new Promise(r => setTimeout(r, 100)); }
  return {
    target: (inv.textContent || '').trim(),
    vals: vals,
    expected: -Number((inv.textContent || '').trim()) * parseFloat(getComputedStyle(col).fontSize),
  };
}
"""


def run_roll(root, path, width):
    httpd, port = serve(root)
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(args=['--no-sandbox'])
            ctx = b.new_context(viewport={'width': width, 'height': 900})
            pg = ctx.new_page()
            pg.goto('http://127.0.0.1:%d%s' % (port, path), wait_until='load')
            pg.wait_for_timeout(2200)
            res = pg.evaluate(ROLL)
            ctx.close()
            b.close()
    finally:
        httpd.shutdown()
    return res


def run_one(root, path, width):
    httpd, port = serve(root)
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(args=['--no-sandbox'])
            ctx = b.new_context(viewport={'width': width, 'height': 900})
            pg = ctx.new_page()
            pg.goto('http://127.0.0.1:%d%s' % (port, path), wait_until='load')
            pg.wait_for_timeout(2500)
            doc_h = pg.evaluate('document.documentElement.scrollHeight')
            y = 0
            while y < doc_h:
                pg.evaluate('window.scrollTo(0, %d)' % y)
                pg.wait_for_timeout(120)
                y += 450
            pg.evaluate('window.scrollTo(0, %d)' % doc_h)
            pg.wait_for_timeout(2500)
            res = pg.evaluate(POST_WALK)
            ctx.close()
            b.close()
    finally:
        httpd.shutdown()
    return res


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--root', required=True)
    ap.add_argument('--path', default='/index.html')
    ap.add_argument('--width', type=int, action='append', default=None)
    ap.add_argument('--json')
    args = ap.parse_args()
    widths = args.width or [1440, 375]

    for w in widths:
        res = run_one(args.root, args.path, w)
        res['roll'] = run_roll(args.root, args.path, w)
        print('--- %s @%d ---' % (args.path, w))
        c = res['counters']
        bad = [x for x in c if not x['ok']]
        check('@%d counters show their value after a full scroll' % w,
              len(c) > 0 and not bad,
              '%d countered, %d wrong%s' % (len(c), len(bad),
                                            '' if not bad else ' e.g. ' + str(bad[:3])))
        roll = res.get('roll') or {}
        vals = roll.get('vals') or []
        distinct = len(set(vals))
        # The counter must ROLL, not jump: intermediate frames have to exist, and
        # it has to land on the digit its .invisible sibling says it should show.
        landed = bool(vals) and roll.get('expected') is not None             and abs(vals[-1] - roll['expected']) <= 2
        check('@%d counter rolls through intermediate frames (0 -> digit)' % w,
              distinct >= 3 and landed,
              'target=%s distinct=%d first=%s last=%s expected=%s'
              % (roll.get('target'), distinct, vals[:1], vals[-1:], roll.get('expected')))
        m = res['masks']
        check('@%d every rendered line is revealed after a full scroll' % w,
              m['hidden'] == 0, 'rendered=%d hidden=%d %s'
              % (m['rendered'], m['hidden'], m['sample'] or ''))

    ok = sum(1 for r in RESULTS if r['pass'])
    print('\n%d/%d checks passed' % (ok, len(RESULTS)))
    if args.json:
        json.dump(RESULTS, open(args.json, 'w'), indent=1)
    raise SystemExit(0 if ok == len(RESULTS) else 1)


if __name__ == '__main__':
    main()
