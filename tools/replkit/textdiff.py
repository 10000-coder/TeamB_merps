#!/usr/bin/env python3
"""Compare TEXT CONTENT between a reference copy and a candidate build.

This closes the known blind spot: measure.py/compare.py check tag, class, box and
computed style but never the text. A port can therefore achieve 100% geometry
while shipping 254 wrong strings.

Classification per element (own direct text, not descendants):
  same            exact match
  ws-only         differs only by collapsed/removed whitespace (JSX drops the
                  inter-element whitespace HTML carries) — reported, not a defect
  DIFFERENT       real content mismatch — the ones that matter
  missing/extra   element present on one side only

Usage:
  python3 textdiff.py --ref-root REF --ref-path /index.html --ref-variant .vdl \
                      --cand-root CAND --cand-path /index.html --cand-variant .v \
                      --width 1440 [--theme light] [--theme-key theme]
                      [--json out.json] [--show 20]
"""
import argparse
import functools
import http.server
import itertools
import json
import os
import re
import socketserver
import sys
import threading

from playwright.sync_api import sync_playwright

DUMP_JS = r"""
(args) => {
  const [variant, scope] = args;
  if (variant) {
    document.querySelectorAll('.v').forEach(e => { if (!e.matches(variant)) e.remove(); });
  }
  const out = [];
  const root = (scope && document.querySelector(scope)) || document.documentElement;
  const all = root.querySelectorAll('*');
  for (const el of all) {
    let own = '';
    for (const n of el.childNodes) {
      if (n.nodeType === 3) own += n.nodeValue;
    }
    own = own.replace(/\s+/g, ' ').trim();
    const attrs = [];
    for (const a of el.attributes) {
      if (['placeholder', 'alt', 'title', 'value', 'aria-label', 'content'].includes(a.name)) {
        attrs.push(a.name + '=' + a.value.replace(/\s+/g, ' ').trim());
      }
    }
    out.push({
      tag: el.tagName.toLowerCase(),
      cls: (el.getAttribute('class') || ''),
      text: own,
      attrs: attrs.join('\u0001'),
      y: Math.round(el.getBoundingClientRect().top + window.scrollY)
    });
  }
  return out;
}
"""


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serve(root):
    handler = functools.partial(Quiet, directory=root)
    httpd = socketserver.TCPServer(('127.0.0.1', 0), handler)
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, port


def dump(root, path, variant, width, theme, theme_key, scope='body'):
    httpd, port = serve(root)
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(args=['--no-sandbox', '--disable-dev-shm-usage'])
            pg = b.new_context(viewport={'width': width, 'height': 900}).new_page()
            if theme == 'dark':
                pg.add_init_script("try{localStorage.setItem('%s','dark')}catch(e){}" % theme_key)
            pg.goto('http://127.0.0.1:%d%s' % (port, path), wait_until='load', timeout=120000)
            pg.wait_for_timeout(1800)
            if theme == 'dark':
                pg.evaluate("document.documentElement.setAttribute('data-theme','dark')")
            pg.evaluate("() => document.fonts.ready.catch(()=>{})")
            pg.wait_for_timeout(500)
            data = pg.evaluate(DUMP_JS, [variant, scope])
            b.close()
    finally:
        httpd.shutdown()
    return data


def key(it, i):
    return '%s|%s' % (it['tag'], (it['cls'] or '').strip()[:60])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--ref-root', required=True)
    ap.add_argument('--cand-root', required=True)
    ap.add_argument('--ref-path', default='/index.html')
    ap.add_argument('--cand-path', default='/index.html')
    ap.add_argument('--ref-variant', default='')
    ap.add_argument('--cand-variant', default='')
    ap.add_argument('--width', type=int, default=1440)
    ap.add_argument('--theme', default='light')
    ap.add_argument('--theme-key', default=os.environ.get('REPLKIT_THEME_KEY', 'theme'))
    ap.add_argument('--json', default='')
    ap.add_argument('--show', type=int, default=20)
    ap.add_argument('--scope', default='body',
                help="CSS selector for the subtree to compare; '' = whole document")
    args = ap.parse_args()

    ref = dump(args.ref_root, args.ref_path, args.ref_variant, args.width,
               args.theme, args.theme_key, args.scope)
    cand = dump(args.cand_root, args.cand_path, args.cand_variant, args.width,
                args.theme, args.theme_key, args.scope)

    n = min(len(ref), len(cand))
    same = ws = 0
    real = []
    attr_diff = []
    for i in range(n):
        a, b = ref[i], cand[i]
        if a['text'] == b['text']:
            same += 1
        elif re.sub(r'\s+', '', a['text']) == re.sub(r'\s+', '', b['text']):
            ws += 1
        else:
            real.append((i, a, b))
        if a['attrs'] != b['attrs']:
            attr_diff.append((i, a, b))

    tail = 'ref_extra' if len(ref) > len(cand) else ('cand_extra' if len(cand) > len(ref) else 'none')
    denom = n if n else 1

    print('textdiff  ref=%s(%d)  cand=%s(%d)  width=%d theme=%s' %
          (args.ref_path, len(ref), args.cand_path, len(cand), args.width, args.theme))
    print('  elements compared : %d' % n)
    print('  text identical    : %d (%.2f%%)' % (same, 100.0 * same / denom))
    print('  whitespace-only   : %d (%.2f%%)   [not a defect]' % (ws, 100.0 * ws / denom))
    print('  TEXT DIFFERENT    : %d (%.2f%%)   <-- the numbers that matter'
          % (len(real), 100.0 * len(real) / denom))
    print('  attribute drift   : %d (placeholder/alt/title/aria-label/value)' % len(attr_diff))
    print('  element count     : %s' % ('balanced' if tail == 'none' else 'ref has extras: ' + tail))
    if real:
        print('\n  genuine text mismatches (showing %d):' % min(args.show, len(real)))
        for i, a, b in real[:args.show]:
            print('   #%d <%s class="%s"> y=%s' % (i, a['tag'], (a['cls'] or '')[:44], a['y']))
            print('       ref : %r' % a['text'][:110])
            print('       cand: %r' % b['text'][:110])
    if attr_diff:
        print('\n  attribute drift (showing %d):' % min(5, len(attr_diff)))
        for i, a, b in attr_diff[:5]:
            print('   #%d <%s>: ref %r vs cand %r' % (i, a['tag'], a['attrs'][:90], b['attrs'][:90]))

    if args.json:
        json.dump({'ref_count': len(ref), 'cand_count': len(cand), 'identical': same,
                   'whitespace_only': ws, 'different': len(real), 'attr_drift': len(attr_diff),
                   'sample': [{'i': i, 'tag': a['tag'], 'cls': a['cls'], 'y': a['y'],
                               'ref': a['text'], 'cand': b['text']} for i, a, b in real[:200]]},
                  open(args.json, 'w', encoding='utf-8'), indent=2)
    return 1 if real else 0


if __name__ == '__main__':
    sys.exit(main())
