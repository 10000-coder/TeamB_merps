"""Screenshot a page as a full-page image built from viewport segments.

Chrome cannot capture these pages in one shot (the render target crashes on a
20M-pixel surface), so we scroll, grab viewport frames and stitch them with the
correct stride. Optionally the fixed page wash is pinned to the document so the
stitched image shows the background once instead of repeating per frame.

Usage:
  python3 shoot.py --root DIR --path /index.html --width 1440 --theme light \
      --out poster.png --variant .vdl [--absolute-bg]
"""
import argparse
import functools
import http.server
import os
import socketserver
import tempfile
import threading

from PIL import Image
from playwright.sync_api import sync_playwright

Image.MAX_IMAGE_PIXELS = None


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
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, port


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--root', required=True)
    ap.add_argument('--path', default='/index.html')
    ap.add_argument('--out', required=True)
    ap.add_argument('--width', type=int, default=1440)
    ap.add_argument('--height', type=int, default=900)
    ap.add_argument('--theme', default='light')
    ap.add_argument('--theme-key', default=os.environ.get('REPLKIT_THEME_KEY', 'theme'),
                    help='localStorage key the target site uses for its theme')
    ap.add_argument('--variant', default='')
    ap.add_argument('--absolute-bg', action='store_true')
    ap.add_argument('--freeze', action='store_true')
    ap.add_argument('--settle', action='store_true',
                    help='walk the document once so one-shot scroll entrances fire, '
                         'then return to the top before capturing')
    ap.add_argument('--keep-segments', default='')
    args = ap.parse_args()

    httpd, port = serve(args.root)
    tmp = args.keep_segments or tempfile.mkdtemp(prefix='segs_')
    os.makedirs(tmp, exist_ok=True)
    frames = []
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(args=['--no-sandbox', '--disable-dev-shm-usage'])
            ctx = b.new_context(viewport={'width': args.width, 'height': args.height},
                                device_scale_factor=1)
            pg = ctx.new_page()
            if args.theme == 'dark':
                pg.add_init_script("try{localStorage.setItem('%s','dark')}catch(e){}" % args.theme_key)
            pg.goto('http://127.0.0.1:%d%s' % (port, args.path), wait_until='load', timeout=120000)
            pg.wait_for_timeout(2000)
            if args.theme == 'dark':
                pg.evaluate("document.documentElement.setAttribute('data-theme','dark')")
                pg.wait_for_timeout(500)
            pg.evaluate("() => document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading='eager')")
            pg.wait_for_timeout(1500)
            if args.variant:
                pg.evaluate("""(sel) => {
                    document.querySelectorAll('.v').forEach(el => { if (!el.matches(sel)) el.remove(); });
                }""", args.variant)
            if args.freeze:
                pg.add_style_tag(content='*{animation:none!important;transition:none!important}')
            if args.absolute_bg:
                pg.evaluate("""() => {
                    const st = document.createElement('style');
                    st.textContent = 'body:before{position:absolute!important;inset:0 0 auto 0!important;height:' +
                        document.documentElement.scrollHeight + 'px!important}';
                    document.head.appendChild(st);
                }""")
            pg.wait_for_timeout(300)
            doc_h = pg.evaluate('document.documentElement.scrollHeight')
            if args.settle:
                # Walk the document so the one-shot scroll entrances actually fire, then come
                # back to the top before capturing.
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
                # Lenis keeps animating toward its own target, so a single scrollTo(0,0) can be
                # pulled back before the first band is taken -- which would silently shift every
                # band. Poll until the page really is at zero.
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
            step = args.height
            y = 0
            n = 0
            while y < doc_h:
                pg.evaluate('window.scrollTo(0, %d)' % y)
                pg.wait_for_timeout(320)
                fp = os.path.join(tmp, 'seg_%04d.png' % n)
                pg.screenshot(path=fp)
                frames.append((fp, y))
                n += 1
                y += step
            b.close()
    finally:
        httpd.shutdown()

    ims = [Image.open(fp).convert('RGB') for fp, _ in frames]
    w = ims[0].size[0]
    total = min(doc_h, frames[-1][1] + ims[-1].size[1])
    canvas = Image.new('RGB', (w, total), (255, 255, 255))
    for im, (fp, y) in zip(ims, frames):
        canvas.paste(im, (0, min(y, total)))
    canvas.save(args.out, optimize=True)
    print('shot ->', args.out, canvas.size, os.path.getsize(args.out))
    if not args.keep_segments:
        for fp, _ in frames:
            os.remove(fp)


if __name__ == '__main__':
    main()
