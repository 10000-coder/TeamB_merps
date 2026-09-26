#!/usr/bin/env python3
"""Build an offline-renderable copy of a captured Next.js SSR page set.

Why this exists: the previous replication shipped a reference package whose
builder was never committed, so the baseline could not be regenerated. This one is
deterministic and self-contained: given `reference/rendered/*.html` plus
`reference/assets/`, it produces `reference/site/` that renders with no network.

What it does
  * drops the framework <script> tags (Next/Turbopack chunks + RSC flight payload)
    because the prerendered DOM is already complete — hydration is what we are
    replacing, not what we are measuring
  * keeps the tiny inline theme script so light/dark still work via localStorage
  * keeps every inline <style> (page-scoped CSS lives there)
  * rewrites /_next/... asset refs, favicons and cross-origin font URLs to local paths
  * verifies that every path it writes actually exists on disk

Usage:
  python3 build_offline.py --ref reference --out reference/site
"""
import argparse
import hashlib
import json
import os
import re
import shutil
import sys

SCRIPT_RE = re.compile(r'<script\b([^>]*)>(.*?)</script>', re.I | re.S)
SCRIPT_EMPTY_RE = re.compile(r'<script\b[^>]*/>', re.I)
PRELOAD_JS_RE = re.compile(r'<link\b[^>]*\bas="script"[^>]*>', re.I)
LINK_JS_RE = re.compile(r'<link\b[^>]*\bhref="[^"]*\.js"[^>]*>', re.I)
FONT_URL_RE = re.compile(r'https://[a-z0-9.-]*aspensearch\.com/_next/static/immutable/media/([^)"\']+)')
NEXT_CHUNK_RE = re.compile(r'/_next/static/immutable/chunks/([A-Za-z0-9._-]+)')
FAVICON_MAP = {
    '/favicon.ico': 'img/favicon.ico',
    '/favicon-32.png': 'img/favicon-32.png',
    '/android-chrome-192.png': 'img/android-chrome-192.png',
    '/icon.png': 'img/icon.png',
    '/apple-icon.png': 'img/apple-icon.png',
}


def sha256(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for b in iter(lambda: f.read(1 << 20), b''):
            h.update(b)
    return h.hexdigest()


def localize_css(src, css_path, out_dir, fonts_src):
    """Copy the stylesheet, pointing its font URLs at the local font files."""
    os.makedirs(os.path.dirname(css_path), exist_ok=True)
    written = set()

    def repl(m):
        name = m.group(1)
        s = os.path.join(fonts_src, name)
        if not os.path.exists(s):
            return m.group(0)      # leave the remote URL if we never archived it
        d = os.path.join(out_dir, 'fonts', name)
        os.makedirs(os.path.dirname(d), exist_ok=True)
        if name not in written:
            shutil.copy2(s, d)
            written.add(name)
        return '../fonts/' + name

    out = FONT_URL_RE.sub(repl, src)
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(out)
    return written


def strip_scripts(html):
    """Remove framework scripts but keep the inline theme bootstrap."""
    kept, dropped = [], 0

    def repl(m):
        nonlocal dropped
        attrs, body = m.group(1), m.group(2)
        if 'src=' in attrs:
            dropped += 1
            return ''
        if 'merps-theme' in body or 'localStorage' in body:
            kept.append(body)
            return m.group(0)
        if 'self.__next_f' in body or '__next_f' in body:
            dropped += 1
            return ''
        kept.append(body)
        return m.group(0)

    out = SCRIPT_RE.sub(repl, html)
    out, n1 = PRELOAD_JS_RE.subn('', out)
    out, n2 = LINK_JS_RE.subn('', out)
    dropped += n1 + n2
    out = SCRIPT_EMPTY_RE.sub('', out)
    return out, dropped


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--ref', default='reference')
    ap.add_argument('--out', default='')
    ap.add_argument('--rendered', default='rendered')
    ap.add_argument('--assets', default='assets')
    ap.add_argument('--report', default='site_build_report.json')
    args = ap.parse_args()

    ref = os.path.abspath(args.ref)
    out_dir = os.path.abspath(args.out or os.path.join(ref, 'site'))
    rdir = os.path.join(ref, args.rendered)
    adir = os.path.join(ref, args.assets)
    fonts_src = os.path.join(adir, 'fonts')

    if os.path.isdir(out_dir):
        shutil.rmtree(out_dir)
    os.makedirs(out_dir)

    if os.path.isdir(os.path.join(adir, 'img')):
        shutil.copytree(os.path.join(adir, 'img'), os.path.join(out_dir, 'img'))

    pages, notes, used_fonts, chunk_files = [], [], set(), set()
    for fn in sorted(os.listdir(rdir)):
        if not fn.endswith('.html'):
            continue
        src = open(os.path.join(rdir, fn), encoding='utf-8', errors='replace').read()
        html, dropped = strip_scripts(src)

        # stylesheets
        def css_ref(m):
            name = m.group(1)
            if not name.endswith('.css'):
                return m.group(0)
            s = os.path.join(adir, 'next', name)
            if os.path.exists(s):
                raw = open(s, encoding='utf-8', errors='replace').read()
                written = localize_css(raw, os.path.join(out_dir, 'css', name), out_dir, fonts_src)
                used_fonts.update(written)
                chunk_files.add(name)
                return 'css/' + name
            notes.append('%s: stylesheet %s not archived' % (fn, name))
            return m.group(0)

        html = NEXT_CHUNK_RE.sub(css_ref, html)

        for remote, local in FAVICON_MAP.items():
            html = html.replace('href="%s"' % remote, 'href="%s"' % local)

        # anything still pointing at /_next/ is a chunk we did not archive
        leftover = sorted(x for x in set(NEXT_CHUNK_RE.findall(html)) if x.endswith('.js'))
        if leftover:
            notes.append('%s: unshipped js refs %s' % (fn, leftover))

        out_name = 'index.html' if fn == 'index.html' else fn
        with open(os.path.join(out_dir, out_name), 'w', encoding='utf-8') as f:
            f.write(html)
        pages.append({'page': out_name, 'bytes': len(html), 'scripts_dropped': dropped})

    # integrity: every relative path the pages reference must exist under out_dir
    missing, routes = [], []
    for p in pages:
        h = open(os.path.join(out_dir, p['page']), encoding='utf-8').read()
        for r in set(re.findall(r'(?:src|href)="([^"#?]+)"', h)):
            if r.startswith(('http', 'data:', 'mailto:')):
                continue
            if os.path.exists(os.path.join(out_dir, r)):
                continue
            bare = r.split('#')[0].split('?')[0]
            if bare.startswith('/') and '.' not in bare.rsplit('/', 1)[-1]:
                routes.append({'page': p['page'], 'route': bare})   # internal nav link
            else:
                missing.append({'page': p['page'], 'ref': r})

    report = {
        'source': ref,
        'out': out_dir,
        'pages': pages,
        'stylesheets': sorted(chunk_files),
        'fonts_localized': sorted(used_fonts),
        'fonts_expected': sorted(os.listdir(fonts_src)) if os.path.isdir(fonts_src) else [],
        'unresolved_assets': missing,
        'route_links': sorted({x['route'] for x in routes}),
        'notes': notes,
    }
    if os.path.isdir(fonts_src):
        allf = set(os.listdir(fonts_src))
        report['fonts_unused'] = sorted(allf - used_fonts)
    json.dump(report, open(args.report, 'w', encoding='utf-8'), indent=2)

    print('offline copy -> %s' % out_dir)
    print('  pages      : %d' % len(pages))
    for p in pages:
        print('    %-20s %7d bytes, %d script(s) dropped' % (p['page'], p['bytes'], p['scripts_dropped']))
    print('  stylesheets: %d' % len(chunk_files))
    print('  fonts      : %d localized, %d unused, %d expected'
          % (len(used_fonts), len(report.get('fonts_unused', [])),
             len(report.get('fonts_expected', []))))
    print('  route links: %s' % sorted({x['route'] for x in routes}))
    if missing:
        print('  UNRESOLVED ASSETS: %d' % len(missing))
        for m in missing[:8]:
            print('    %s -> %s' % (m['page'], m['ref']))
    if notes:
        print('  notes:')
        for n in notes[:6]:
            print('    ' + n)
    return 1 if missing else 0


if __name__ == '__main__':
    sys.exit(main())
