"""Measure a rendered page: geometry + key computed styles, for objective diffing.

Usage:
  python3 measure.py --root <dir> --path /index.html --out out.json \
      --width 1440 --height 900 --theme light [--screenshot shot.png] [--variant .vdl]
"""
import argparse
import functools
import http.server
import json
import os
import socketserver
import sys
import threading

from playwright.sync_api import sync_playwright

MEASURE_JS = r"""
(args) => {
  const [selector] = args;
  const root = selector ? document.querySelector(selector) : document.body;
  if (!root) return {error: 'root not found: ' + selector, count: 0, items: []};
  const PROPS = ['fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'backgroundColor','backgroundImage','borderRadius','display','position','padding','margin',
    'gap','boxShadow','opacity','transform','zIndex','flexDirection','gridTemplateColumns',
    'justifyContent','alignItems','textAlign','overflow','objectFit','height','width',
    'borderTopWidth','borderTopColor','filter','textOverflow','whiteSpace','inset'];
  const items = [];
  const all = root.querySelectorAll('*');
  let idx = 0;
  const walk = (el, depth) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const o = {};
    for (const p of PROPS) o[p] = cs[p];
    const style = {};
    for (const p of PROPS) style[p] = o[p];
    items.push({
      i: idx++,
      d: depth,
      t: el.tagName.toLowerCase(),
      c: (el.getAttribute('class') || '').split(/\s+/).filter(Boolean).sort().join(' '),
      r: [Math.round(r.x * 10) / 10, Math.round(r.y * 10) / 10,
          Math.round(r.width * 10) / 10, Math.round(r.height * 10) / 10],
      x: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60),
      s: style,
    });
    for (const ch of el.children) walk(ch, depth + 1);
  };
  walk(root, 0);
  const body = document.body;
  return {
    count: items.length,
    docHeight: Math.round(document.documentElement.scrollHeight),
    docWidth: Math.round(document.documentElement.scrollWidth),
    bodyHeight: Math.round(body.getBoundingClientRect().height),
    items,
  };
}
"""


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


# A page is settled when nothing is animating AND nothing is still rewriting
# inline styles. Counting style mutations is what catches the JS timers behind the
# entrances: those fire long after getAnimations() already reports nothing running,
# and a capture in between would catch a line mid-cleanup.
AWAIT_SETTLED = """
(ms) => {
  if (!window.__settleMut) {
    window.__settleMut = 0;
    window.__settleLast = -1;
    window.__settleSince = Date.now();
    new MutationObserver(list => {
      for (const m of list) if (m.attributeName === 'style') window.__settleMut++;
    }).observe(document.documentElement,
               {subtree: true, attributes: true, attributeFilter: ['style', 'class']});
  }
  const n = window.__settleMut;
  const t = Date.now();
  if (n !== window.__settleLast) { window.__settleLast = n; window.__settleSince = t; return 0; }
  const running = document.getAnimations().filter(a => a.playState !== 'finished').length;
  return (running === 0 && (t - window.__settleSince) >= ms) ? 1 : 0;
}
"""


def await_settled(pg, quiet_ms=700, timeout_s=10.0):
    """Block until the page stops animating and stops mutating inline styles."""
    import time
    t0 = time.time()
    while time.time() - t0 < timeout_s:
        try:
            if pg.evaluate(AWAIT_SETTLED, quiet_ms):
                return True
        except Exception:
            return False
        pg.wait_for_timeout(100)
    return False


def serve(root):
    handler = functools.partial(Quiet, directory=root)
    httpd = socketserver.TCPServer(('127.0.0.1', 0), handler)
    port = httpd.server_address[1]
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    return httpd, port


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--root', required=True)
    ap.add_argument('--path', default='/index.html')
    ap.add_argument('--out', required=True)
    ap.add_argument('--width', type=int, default=1440)
    ap.add_argument('--height', type=int, default=900)
    ap.add_argument('--dpr', type=float, default=2)
    ap.add_argument('--theme', default='light')
    ap.add_argument('--theme-key', default=os.environ.get('REPLKIT_THEME_KEY', 'theme'),
                    help='localStorage key the target site uses for its theme')
    ap.add_argument('--variant', default='')
    ap.add_argument('--screenshot', default='')
    ap.add_argument('--fullpage', action='store_true')
    ap.add_argument('--freeze', action='store_true')
    ap.add_argument('--settle', action='store_true',
                    help='walk the document once so one-shot scroll entrances fire, '
                         'then return to the top before measuring/capturing')
    args = ap.parse_args()

    httpd, port = serve(args.root)
    url = 'http://127.0.0.1:%d%s' % (port, args.path)
    out = {}
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--no-sandbox', '--disable-dev-shm-usage',
                                    '--force-device-scale-factor=%s' % args.dpr])
        ctx = b.new_context(viewport={'width': args.width, 'height': args.height},
                            device_scale_factor=args.dpr)
        pg = ctx.new_page()
        if args.theme == 'dark':
            pg.add_init_script("try{localStorage.setItem('%s','dark')}catch(e){}" % args.theme_key)
        pg.goto(url, wait_until='load', timeout=90000)
        if args.freeze:
            # The page has time-based CSS animations (typed composer, drifting
            # background blobs). Pin every animation to its first keyframe so two
            # runs are comparable instead of sampling different animation phases.
            pg.add_style_tag(content='*{animation:none!important;transition:none!important}')
        pg.wait_for_timeout(2500)
        if args.theme == 'dark':
            pg.evaluate("document.documentElement.setAttribute('data-theme','dark')")
            pg.wait_for_timeout(400)
        # force-load lazy images and let layout settle
        pg.evaluate("""() => { document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager'); }""")
        pg.wait_for_timeout(1200)
        try:
            pg.evaluate("document.fonts.ready")
        except Exception:
            pass

        if args.settle:
            # Step from Python, not from a single JS loop: IntersectionObserver
            # batches on a frame, so scrolling through the document in one call
            # would skip every intermediate position and never fire the entrances.
            doc_h = pg.evaluate('document.documentElement.scrollHeight')
            step = max(120, args.height // 2)
            y = 0
            while y < doc_h:
                pg.evaluate('window.scrollTo(0, %d)' % y)
                pg.wait_for_timeout(120)
                y += step
            pg.evaluate('window.scrollTo(0, %d)' % doc_h)
            await_settled(pg)
            pg.evaluate('window.scrollTo(0, 0)')
            # Lenis keeps animating toward its own target, so a single scrollTo(0,0)
            # can be pulled back before the next measurement -- which would silently
            # shift every viewport-relative rect. Poll until it is really at zero.
            for _ in range(40):
                if pg.evaluate('window.scrollY') == 0:
                    break
                pg.evaluate('window.scrollTo(0, 0)')
                pg.wait_for_timeout(100)
            # Settle AGAIN. The walk scrolled the whole document, and parts of
            # this page derive state from scroll position (the "How it works"
            # stage, the counters). Without this the measurement samples whatever
            # state the walk left behind rather than the state seen at the top.
            await_settled(pg)
            pg.wait_for_timeout(400)
        out = pg.evaluate(MEASURE_JS, [args.variant])
        if args.screenshot:
            pg.screenshot(path=args.screenshot, full_page=args.fullpage)
        b.close()
    httpd.shutdown()
    with open(args.out, 'w', encoding='utf-8') as f:
        json.dump(out, f)
    print('measure ->', args.out, 'elements:', out.get('count'), 'docHeight:', out.get('docHeight'),
          'docWidth:', out.get('docWidth'))


if __name__ == '__main__':
    main()
