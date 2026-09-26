#!/usr/bin/env python3
"""Probe whether the webfont actually loads on each side, and what the text measures.

A text-width delta of a few px on a handful of spans usually means one side is
rendering with the fallback face. This prints, for both sides, the font actually
used for a given selector, whether the FontFace is loaded, and the measured width.
"""
import http.server
import socketserver
import threading
import sys

from playwright.sync_api import sync_playwright

SEL = 'header span.tabular-nums.text-caption-20'


def serve(root):
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **k):
            super().__init__(*a, directory=root, **k)

        def log_message(self, *a):
            pass

    httpd = socketserver.TCPServer(('127.0.0.1', 0), Quiet)
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, port


def probe(page, url, label):
    page.goto(url, wait_until='load', timeout=120000)
    page.wait_for_timeout(1200)
    out = page.evaluate("""(sel) => {
      const el = document.querySelector(sel);
      const cs = el ? getComputedStyle(el) : null;
      const faces = [];
      document.fonts.forEach(f => faces.push([f.family, f.status]));
      const probe = (fam, txt) => {
        const c = document.createElement('canvas').getContext('2d');
        c.font = '16px ' + fam;
        return c.measureText(txt).width;
      };
      return {
        text: el ? el.textContent : null,
        rect: el ? [el.getBoundingClientRect().width, el.getBoundingClientRect().height] : null,
        fontFamily: cs ? cs.fontFamily : null,
        fontSize: cs ? cs.fontSize : null,
        letterSpacing: cs ? cs.letterSpacing : null,
        fontFeatureSettings: cs ? cs.fontFeatureSettings : null,
        faces: faces,
        checkSuisse: document.fonts.check('16px suisseIntl'),
        checkMono: document.fonts.check('16px suisseIntlMono'),
        widthSuisse: probe('suisseIntl', 'Markets 1 Listed 47'),
        widthFallback: probe('sans-serif', 'Markets 1 Listed 47'),
      };
    }""", SEL)
    print(f'--- {label}')
    for k, v in out.items():
        print(f'    {k}: {v}')


def main():
    with sync_playwright() as pw:
        browser = pw.chromium.launch(args=['--no-sandbox'])
        for root, path, label in [
            ('/home/daytona/rakazo-home/shared/TeamB_merps/reference/site',
             '/index.html', 'REFERENCE offline copy'),
            ('/home/daytona/rakazo-home/shared/TeamB_merps/app/dist',
             '/index.html', 'CANDIDATE dist'),
        ]:
            httpd, port = serve(root)
            ctx = browser.new_context(viewport={'width': 1440, 'height': 900},
                                      device_scale_factor=1)
            page = ctx.new_page()
            try:
                probe(page, f'http://127.0.0.1:{port}{path}', label)
            finally:
                ctx.close()
                httpd.shutdown()
        browser.close()


if __name__ == '__main__':
    sys.exit(main())
