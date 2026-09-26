#!/usr/bin/env python3
"""Structure-tier check for the settled market panel.

`/trade` and `/trade/options` cannot be pixel-diffed against the offline copy: the
offline copy is the PRE-fetch SSR state ("Loading markets...") while a real browser
sees the populated list. So they are verified against the settled capture instead
(reference/settled/trade_market_list.html, taken from a cloud browser), comparing
element shape and cell text -- tag, class, and the exact display strings.

External requests are aborted so the GMGN iframe cannot stall the run; the frame's
PRESENCE and attributes are checked, not its contents.
"""
import json
import re
import sys
import http.server
import socketserver
import threading
from pathlib import Path

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

ROOT = Path('/home/daytona/rakazo-home/shared/TeamB_merps')
SETTLED = ROOT / 'reference/settled/trade_market_list.html'


def shape(el):
    """(tag, class, [own-text...]) for a market row."""
    out = [el.name, ' '.join(el.get('class') or []), el.get('data-active')]
    cells = []
    for child in el.find_all(recursive=False):
        cells.append((child.name, ' '.join(child.get('class') or []),
                      ' '.join(child.get_text(' ', strip=True).split())))
    return {'tag': out[0], 'class': out[1], 'active': out[2], 'cells': cells}


def rows_from_html(html):
    soup = BeautifulSoup(html, 'html.parser')
    scroll = soup.select_one('.desk-scroll')
    assert scroll, 'no .desk-scroll in reference fragment'
    return [shape(b) for b in scroll.find_all('button', recursive=False)]


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


def main():
    ref_rows = rows_from_html(SETTLED.read_text(errors='replace'))
    print('settled capture: %d rows' % len(ref_rows))

    dist = ROOT / 'app/dist'
    httpd, port = serve(dist)
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(args=['--no-sandbox'])
            ctx = browser.new_context(viewport={'width': 1440, 'height': 900})
            page = ctx.new_page()
            page.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort())
            page.goto('http://127.0.0.1:%d/trade/' % port, wait_until='load',
                      timeout=120000)
            page.wait_for_timeout(1500)
            html = page.evaluate("""() => {
              const s = document.querySelector('.desk-scroll');
              return s ? s.outerHTML : '';
            }""")
            head = page.evaluate("""() => {
              const h = document.querySelector('.desk-hit-head');
              return h ? [...h.children].map(c => c.textContent).join('|') : '';
            }""")
            chips = page.evaluate("""() => [...document.querySelectorAll('.desk-chip')]
              .map(c => c.textContent + ':' + c.getAttribute('data-active')).join(', ')""")
            frame = page.evaluate("""() => {
              const f = document.querySelector('iframe.desk-chart');
              return f ? {src: f.getAttribute('src'),
                          loading: f.getAttribute('loading'),
                          referrerpolicy: f.getAttribute('referrerpolicy'),
                          allow: f.getAttribute('allow'),
                          title: f.getAttribute('title')} : null;
            }""")
            figure = page.evaluate("""() => {
              // every desk-figure on the page, with its panel label, so the chart
              // one is not confused with the "Desk balance" one
              const out = [];
              for (const sec of document.querySelectorAll('section.desk-panel')) {
                const f = sec.querySelector('span.desk-figure');
                if (!f) continue;
                const lbl = sec.querySelector('span');
                out.push((lbl ? lbl.textContent.trim() : '?') + '=' + f.textContent);
              }
              return out;
            }""")
            ctx.close()
            browser.close()
    finally:
        httpd.shutdown()

    cand_rows = rows_from_html(html)
    print('candidate     : %d rows' % len(cand_rows))
    print('header row    : %r' % head)
    print('chips         : %s' % chips)
    print('chart figure  : %r' % figure)
    print('chart iframe  : %s' % json.dumps(frame))

    ok = True
    if len(cand_rows) != len(ref_rows):
        print('FAIL row count %d != %d' % (len(cand_rows), len(ref_rows)))
        ok = False
    diffs = 0
    for i, (a, b) in enumerate(zip(ref_rows, cand_rows)):
        if a != b:
            diffs += 1
            if diffs <= 5:
                print('  row %d differs' % i)
                if a['class'] != b['class'] or a['tag'] != b['tag']:
                    print('    shape ref=%s/%s cand=%s/%s'
                          % (a['tag'], a['class'], b['tag'], b['class']))
                for ca, cb in zip(a['cells'], b['cells']):
                    if ca != cb:
                        print('    cell ref=%r cand=%r' % (ca, cb))
    if diffs:
        print('FAIL %d/%d rows differ structurally' % (diffs, len(ref_rows)))
        ok = False
    else:
        print('rows: %d/%d identical in tag, class, data-active and cell text'
              % (len(ref_rows), len(ref_rows)))

    if not frame or not frame['src'].startswith('https://www.gmgn.cc/kline/'):
        print('FAIL gmgn iframe missing or wrong src')
        ok = False
    if frame and (frame['src'].startswith('https://www.gmgn.cc/kline/robinhood/')
                  and 'theme=' in frame['src'] and 'interval=' in frame['src']):
        print('gmgn embed   : chain/theme/interval all present')
    print('STRUCTURE TIER ' + ('PASS' if ok else 'FAIL'))
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main())
