#!/usr/bin/env python3
"""Probe the #clients stage state on both sides, fresh vs after a full-page walk.

Question: after walking to the bottom and returning to the top, does the active
stage return to the state shown on first paint? If the candidate keeps a stale
stage (and the reference does not), that is a real behavioural defect, not a
measurement artifact.
"""
import functools
import http.server
import socketserver
import sys
import threading

from playwright.sync_api import sync_playwright


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serve(root):
    handler = functools.partial(Quiet, directory=root)
    httpd = socketserver.TCPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


PROBE = r"""
() => {
  const ul = document.querySelector('ul[aria-label="How it works"]');
  if (!ul) return { error: 'no ul' };
  const btns = [...ul.querySelectorAll('li > button')];
  const active = btns.map(b => b.classList.contains('text-theme-bg') ? 1 : 0);
  const pct = (ul.closest('#clients') || document.body).querySelector('[style*="600%"]');
  const stacks = [...(ul.closest('#clients') || document.body)
      .querySelectorAll('.relative.overflow-hidden')]
    .map(s => s.querySelector(':scope > .flex.flex-col'))
    .filter(s => s && s.childElementCount === btns.length)
    .map(s => s.style.transform || '(none)');
  const mid = window.innerHeight / 2;
  const dists = btns.map(b => {
    const r = b.getBoundingClientRect();
    return Math.round(Math.abs(r.top + r.height / 2 - mid));
  });
  return {
    n: btns.length,
    active,
    nearest: dists.indexOf(Math.min(...dists)),
    pct: pct ? (pct.style.transform || '(none)') : '(no pct)',
    stacks: [...new Set(stacks)],
    scrollY: Math.round(window.scrollY),
    docH: document.documentElement.scrollHeight,
  };
}
"""


def run(root, path, width, walk):
    httpd, port = serve(root)
    url = 'http://127.0.0.1:%d%s' % (port, path)
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--no-sandbox'])
        ctx = b.new_context(viewport={'width': width, 'height': 900})
        pg = ctx.new_page()
        pg.goto(url, wait_until='load')
        pg.wait_for_timeout(2500)
        fresh = pg.evaluate(PROBE)
        after = None
        if walk:
            doc_h = pg.evaluate('document.documentElement.scrollHeight')
            y = 0
            while y < doc_h:
                pg.evaluate('window.scrollTo(0, %d)' % y)
                pg.wait_for_timeout(120)
                y += 450
            pg.evaluate('window.scrollTo(0, %d)' % doc_h)
            pg.wait_for_timeout(900)
            for _ in range(40):
                if pg.evaluate('window.scrollY') == 0:
                    break
                pg.evaluate('window.scrollTo(0, 0)')
                pg.wait_for_timeout(100)
            pg.wait_for_timeout(1200)
            after = pg.evaluate(PROBE)
        ctx.close()
        b.close()
    httpd.shutdown()
    return fresh, after


def main():
    width = int(sys.argv[1]) if len(sys.argv) > 1 else 1440
    for label, root, path in (
        ('REFERENCE', 'shared/TeamB_merps/reference/site', '/index.html'),
        ('CANDIDATE', 'shared/TeamB_merps/app/dist', '/index.html'),
    ):
        fresh, after = run(root, path, width, walk=True)
        print('=== %s @%d ===' % (label, width))
        print('  fresh      :', fresh)
        print('  after walk :', after)
        if fresh and after and 'active' in fresh and 'active' in after:
            print('  stage returns to first-paint state:', fresh['active'] == after['active'],
                  '| active', fresh['active'], '->', after['active'])


if __name__ == '__main__':
    main()
