#!/usr/bin/env python3
"""GATE 0 — is the reference package good enough to write code against?

Every costly mistake in the previous replication traced back to starting
implementation before an offline-remeasurable reference existed. This script is
the enforcement point: run it BEFORE the first line of app code, and re-run it
whenever the reference package changes.

Checks
  1 hydrated DOM captured (provenance: the raw, unmodified response)
  2 offline copy present and it RENDERS (element count, scroll height)
  3 every local asset the OFFLINE COPY asks for resolves on disk
  4 every asset the DATA files ask for resolves on disk   <- the leading-slash trap
  5 asset manifest: every entry exists and matches its recorded sha256
  6 declared baselines exist with plausible dimensions
  7 structured data files parse and are non-empty
  8 route/page inventory is explicit (no silent "one page" assumption)

Usage:
  python3 gate0.py --ref shared/foo_reference [--width 1440] [--variant .vdl]
                   [--offline-dir site] [--data-dir data] [--manifest GLOB]
                   [--public-root shared/TeamB_foo/public] [--json out.json] [--no-render]
Exit code 0 only when no check FAILS.
"""
import argparse
import glob
import hashlib
import json
import os
import re
import sys

LOCAL_ASSET_RE = re.compile(
    r'''(?:src|href|srcset|poster|data-src)\s*=\s*["']([^"'>\s]+)''', re.I)
# Assets referenced from inline styles / <style> via url(...). Missed by the
# attribute-only pattern above - which is how a mask-image:url(/logo.png) hero
# logo went missing while this gate still reported "all assets resolve".
CSS_URL_RE = re.compile(r'''url\(\s*["']?([^"')]+)["']?\s*\)''', re.I)
ASSET_LIKE_RE = re.compile(
    r'\.(?:png|jpe?g|webp|avif|gif|svg|ico|bmp|woff2?|ttf|otf|eot|css|mp4|webm|js|mjs'
    r'|json|txt|xml|webmanifest)$', re.I)
DATA_ASSET_RE = re.compile(
    r'''["'](/[A-Za-z0-9_@./\-]*\.(?:png|jpe?g|webp|avif|gif|svg|ico|bmp|woff2?|ttf|otf|eot|css|mp4|webm))["']''')
DATA_ASSET_RE_REL = re.compile(
    r'''["'](\.{0,2}/?[A-Za-z0-9_@.\-]+/[A-Za-z0-9_@./\-]*\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|otf))["']''')
REMOTE_RE = re.compile(r'^(?:https?:)?//')
HOSTPATH_RE = re.compile(r'^/(?:home|Users|mnt|tmp|var|opt|root)/')
DATA_EXT = ('.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.mjs', '.cjs')
PROVENANCE_FILES = ('download_manifest', 'screenshot_manifest', 'asset_manifest', 'xfer')
SKIP_DIRS = {'.git', 'node_modules', 'dist', 'build', '.next', '.cache', '.venv'}


class Gate:
    def __init__(self):
        self.rows = []

    def add(self, name, status, detail):
        self.rows.append((name, status, detail))

    @property
    def failed(self):
        return [r for r in self.rows if r[1] == 'FAIL']


def sha256(path, buf=1 << 20):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        while True:
            b = f.read(buf)
            if not b:
                break
            h.update(b)
    return h.hexdigest()


def resolve(ref, href, public_root=None):
    """Map a DOM/data reference to a file on disk.

    Returns a path, 'MISSING:<ref>', or 'HOSTPATH:<ref>' (a build-host absolute
    path leaked into data — portable-unfriendly but not a missing asset), or None
    when the reference is remote / inline / not an asset.
    """
    href = href.split('#')[0].split('?')[0].strip()
    if not href or href.startswith(('data:', 'mailto:', 'javascript:', 'tel:')):
        return None
    if REMOTE_RE.match(href) or href.startswith('http'):
        return None
    if HOSTPATH_RE.match(href):
        return 'HOSTPATH:' + href
    if href.startswith('/'):
        rel = href.lstrip('/')
        bases = ([public_root] if public_root else []) + [
            ref, os.path.join(ref, 'site'), os.path.join(ref, 'public'),
            os.path.join(ref, 'site', 'public')]
        for base in bases:
            if base and os.path.exists(os.path.join(base, rel)):
                return os.path.join(base, rel)
        return 'MISSING:' + href
    if href.startswith('./') or href.startswith('../') or '/' in href:
        cands = [os.path.join(ref, href), os.path.join(ref, 'site', href)]
        for c in cands:
            if os.path.exists(c):
                return c
        return 'MISSING:' + href
    # bare filename, e.g. url(logo.png) in an inline style. CSS resolves it against
    # the page URL, which for a captured capture served at / is the document root.
    bases = ([public_root] if public_root else []) + [
        os.path.join(ref, 'site'), os.path.join(ref, 'public'), ref]
    for base in bases:
        if base and os.path.exists(os.path.join(base, href)):
            return os.path.join(base, href)
    return 'MISSING:' + href


def walk_data_files(ref):
    for root, dirs, files in os.walk(ref):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith('.')]
        for fn in files:
            if fn.endswith(DATA_EXT) and not fn.endswith(('.min.js', '.min.css')):
                if any(k in fn for k in PROVENANCE_FILES):
                    continue
                yield os.path.join(root, fn)


def image_size(path):
    try:
        from PIL import Image
        with Image.open(path) as im:
            return im.size
    except Exception:
        return None


def find_manifest(ref, pattern):
    cands = []
    parent = os.path.dirname(ref.rstrip('/'))
    for pat in ([pattern] if pattern else
                ['asset_manifest.json', 'manifest.json', '*asset_manifest*.json',
                 '*_manifest.json', '**/asset_manifest.json', '**/manifest.json']):
        if os.path.isabs(pat):
            cands += glob.glob(pat)
        else:
            cands += glob.glob(os.path.join(ref, pat))
            cands += glob.glob(os.path.join(parent, pat))
            cands += glob.glob(os.path.join(parent, '*', pat))
    seen, out = set(), []
    for c in cands:
        rp = os.path.realpath(c)
        if rp not in seen:
            seen.add(rp)
            out.append(c)
    return out


def render_check(site, width, variant, timeout=90000):
    import functools
    import http.server
    import socketserver
    import threading
    from playwright.sync_api import sync_playwright

    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass

    handler = functools.partial(Q, directory=site)
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(('127.0.0.1', 0), handler)
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(args=['--no-sandbox', '--disable-dev-shm-usage'])
            pg = b.new_context(viewport={'width': width, 'height': 900}).new_page()
            pg.goto('http://127.0.0.1:%d/index.html' % port, wait_until='load', timeout=timeout)
            pg.wait_for_timeout(2000)
            if variant:
                pg.evaluate("""(sel) => {
                    document.querySelectorAll('.v').forEach(e => { if (!e.matches(sel)) e.remove(); });
                }""", variant)
                pg.wait_for_timeout(400)
            n = pg.evaluate('document.querySelectorAll("*").length')
            h = pg.evaluate('document.documentElement.scrollHeight')
            w = pg.evaluate('document.documentElement.scrollWidth')
            b.close()
    finally:
        httpd.shutdown()
    return n, h, w


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--ref', required=True)
    ap.add_argument('--offline-dir', default='site')
    ap.add_argument('--data-dir', default='data')
    ap.add_argument('--manifest', default='')
    ap.add_argument('--screenshots', default='screenshots')
    ap.add_argument('--width', type=int, default=1440)
    ap.add_argument('--variant', default='')
    ap.add_argument('--public-root', default=None,
                    help='app public/ dir, used to resolve absolute data refs')
    ap.add_argument('--min-elements', type=int, default=200)
    ap.add_argument('--min-height', type=int, default=1200)
    ap.add_argument('--json', default='')
    ap.add_argument('--no-render', action='store_true')
    args = ap.parse_args()

    ref = os.path.realpath(args.ref)
    g = Gate()
    if not os.path.isdir(ref):
        print('FATAL: reference package not found:', args.ref)
        return 2
    g.add('reference package exists', 'PASS', ref)

    # 1 provenance DOM
    dom = None
    for cand in ('rendered.html', 'index.html', os.path.join(args.offline_dir, 'index.html')):
        p = os.path.join(ref, cand)
        if os.path.exists(p) and os.path.getsize(p) > 4096:
            dom = p
            break
    g.add('hydrated DOM captured', 'PASS' if dom else 'FAIL',
          '%s (%.1f KB)' % (os.path.relpath(dom, ref), os.path.getsize(dom) / 1024.0) if dom
          else 'no rendered.html / index.html > 4KB')

    # 2 offline copy renders
    site = os.path.join(ref, args.offline_dir)
    offline_index = os.path.join(site, 'index.html')
    have_site = os.path.isdir(site) and os.path.exists(offline_index)
    if not have_site:
        g.add('offline copy renders', 'FAIL',
              'no %s/index.html — baseline cannot be re-measured' % args.offline_dir)
    elif args.no_render:
        g.add('offline copy renders', 'SKIP', '--no-render')
    else:
        try:
            n, h, w = render_check(site, args.width, args.variant)
            ok = n >= args.min_elements and h >= args.min_height
            g.add('offline copy renders', 'PASS' if ok else 'FAIL',
                  'elements=%s docHeight=%s docWidth=%s (need >=%d / >=%d)'
                  % (n, h, w, args.min_elements, args.min_height))
        except Exception as e:
            g.add('offline copy renders', 'FAIL', 'render error: %s' % e)

    # 3 offline copy's own asset references
    if have_site:
        with open(offline_index, encoding='utf-8', errors='replace') as f:
            html = f.read()
        refs = sorted(set(LOCAL_ASSET_RE.findall(html))
                    | {u for u in CSS_URL_RE.findall(html)
                       if not u.startswith(('data:', '#'))})
        missing, hostpaths, checked, routes = [], [], 0, []
        for r in refs:
            if not ASSET_LIKE_RE.search(r.split('#')[0].split('?')[0]):
                if r.startswith('/') and not REMOTE_RE.match(r):
                    routes.append(r)
                continue
            res = resolve(ref, r, args.public_root)
            if res is None:
                continue
            checked += 1
            if res.startswith('MISSING:'):
                missing.append(res[8:])
            elif res.startswith('HOSTPATH:'):
                hostpaths.append(res[9:])
        if checked == 0:
            g.add('offline assets resolve', 'FAIL', 'offline copy references no local assets')
        elif missing:
            g.add('offline assets resolve', 'FAIL',
                  '%d/%d missing, e.g. %s' % (len(missing), checked,
                                              ', '.join(sorted(missing)[:5])))
        else:
            note = '%d/%d on disk' % (checked, checked)
            if hostpaths:
                note += '; %d build-host path(s) referenced' % len(hostpaths)
            g.add('offline assets resolve', 'PASS', note)
        if routes:
            routes = sorted(set(r.split('#')[0].rstrip('/') or '/' for r in routes))
            captured = {'/'}
            for base_dir in (os.path.join(ref, 'site'), os.path.join(ref, args.offline_dir),
                             os.path.join(ref, 'routes')):
                if not os.path.isdir(base_dir):
                    continue
                for dp, dn, fn in os.walk(base_dir):
                    for f in fn:
                        if not f.endswith(('.html', '.gz')):
                            continue
                        stem = f.split('.html')[0]
                        d = os.path.relpath(dp, base_dir).replace(os.sep, '/')
                        if d == '.':
                            d = ''
                        if stem == 'index':
                            captured.add('/' + d.strip('/') or '/')
                        else:
                            full = (d + '/' + stem).strip('/')
                            captured.add('/' + full)
                            captured.add('/' + full.replace('-', '/'))
            captured = {c.rstrip('/') or '/' for c in captured}
            covered = [r for r in routes if r.rstrip('/') in captured or r in captured]
            uncovered = [r for r in routes if r not in covered]
            if uncovered:
                shown = ', '.join(uncovered[:6]) + (' …' if len(uncovered) > 6 else '')
                g.add('internal routes captured', 'FAIL',
                      '%d of %d internal links have no capture: %s'
                      % (len(uncovered), len(routes), shown))
            else:
                g.add('internal routes captured', 'PASS',
                      'all %d internal link target(s) covered (%d capture name(s) known)'
                      % (len(routes), len(captured)))

    # 4 DATA-declared assets (the trap: refs in json/ts that no manifest lists)
    data_refs = {}
    for p in walk_data_files(ref):
        try:
            with open(p, encoding='utf-8', errors='replace') as f:
                txt = f.read()
        except Exception:
            continue
        for m in DATA_ASSET_RE.findall(txt) + DATA_ASSET_RE_REL.findall(txt):
            data_refs.setdefault(m, set()).add(os.path.relpath(p, ref))
    dmissing, dhost = [], []
    for r, owners in sorted(data_refs.items()):
        res = resolve(ref, r, args.public_root)
        if res is None:
            continue
        if res.startswith('MISSING:'):
            dmissing.append((res[8:], sorted(owners)[:2]))
        elif res.startswith('HOSTPATH:'):
            dhost.append((res[9:], sorted(owners)[:1]))
    if not data_refs:
        g.add('DATA assets resolve', 'FAIL', 'no image/font paths found in data files')
    elif dmissing:
        g.add('DATA assets resolve', 'FAIL', '%d/%d missing: %s'
              % (len(dmissing), len(data_refs),
                 '; '.join('%s (%s)' % (a, ','.join(b)) for a, b in dmissing[:5])))
    else:
        note = '%d/%d on disk' % (len(data_refs), len(data_refs))
        if dhost:
            note += '; %d host-absolute path(s): %s' % (len(dhost), dhost[0][0])
        g.add('DATA assets resolve', 'PASS', note)

    # 5 manifest integrity
    found = find_manifest(ref, args.manifest)
    if not found:
        g.add('asset manifest verified', 'FAIL',
              'no asset manifest found (searched %s and siblings) — without one, '
              'assets that are not archived cannot be re-fetched' % ref)
    else:
        okany = False
        notes = []
        for mp in found:
            try:
                man = json.load(open(mp, encoding='utf-8'))
            except Exception as e:
                notes.append('%s unparseable (%s)' % (os.path.basename(mp), e))
                continue
            items = man.get('assets') if isinstance(man, dict) else man
            if items is None and isinstance(man, dict):
                items = man.get('files', man.get('entries'))
            if isinstance(items, dict):
                items = [dict(path=k, **(v if isinstance(v, dict) else {'sha256': v}))
                         for k, v in items.items()]
            if not items:
                notes.append('%s has no entries' % os.path.basename(mp))
                continue
            absent, bad, noprobe = [], [], 0
            for it in items:
                rel = it.get('path') or it.get('file') or it.get('name')
                if not rel:
                    noprobe += 1
                    continue
                if REMOTE_RE.match(rel) or rel.startswith('http'):
                    continue
                bases = [ref, os.path.dirname(mp), args.public_root,
                         os.path.join(ref, 'site'), os.path.join(ref, 'public')]
                fp = None
                for b in bases:
                    if not b:
                        continue
                    c = os.path.join(b, rel.lstrip('/'))
                    if os.path.exists(c):
                        fp = c
                        break
                if fp is None:
                    absent.append(rel)
                    continue
                want = (it.get('sha256') or '').lower()
                if not want:
                    noprobe += 1
                elif sha256(fp) != want:
                    bad.append(rel)
            if absent or bad:
                notes.append('%s: %d absent (%s), %d hash mismatch (%s)'
                             % (os.path.basename(mp), len(absent), ', '.join(absent[:3]),
                                len(bad), ', '.join(bad[:3])))
            else:
                okany = True
                notes.append('%s: %d entries verified, %d without hash'
                             % (os.path.basename(mp), len(items), noprobe))
        g.add('asset manifest verified', 'PASS' if okany else 'FAIL', '; '.join(notes))

    # 6 baselines (top-level only; subdirs hold interaction shots)
    sp = os.path.join(ref, args.screenshots)
    if not os.path.isdir(sp):
        g.add('declared baselines', 'FAIL', 'no %s/' % args.screenshots)
    else:
        top = [os.path.join(sp, f) for f in sorted(os.listdir(sp))
               if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
        deep = [os.path.join(r, f) for r, d, fs in os.walk(sp) for f in fs
                if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
        if not top:
            g.add('declared baselines', 'FAIL', 'no top-level baseline image in %s/' % args.screenshots)
        else:
            thin = [(os.path.basename(p), image_size(p)) for p in top
                    if (image_size(p) or (0, 0))[1] < args.min_height]
            if thin:
                g.add('declared baselines', 'FAIL',
                      'baseline shorter than %dpx — not a full-page capture: %s'
                      % (args.min_height, thin[:3]))
            else:
                g.add('declared baselines', 'PASS',
                      '%d baseline(s) + %d in subdirs, e.g. %s'
                      % (len(top), len(deep) - len(top), image_size(top[0])))

    # 7 structured data
    dd = os.path.join(ref, args.data_dir)
    jsons = ([os.path.join(dd, f) for f in sorted(os.listdir(dd)) if f.endswith('.json')]
             if os.path.isdir(dd) else [])
    if not jsons:
        g.add('structured data parses', 'WARN',
              'no data layer at %s/ — confirm the target has no structured content'
              % args.data_dir)
    else:
        bad, empty = [], []
        for p in jsons:
            try:
                obj = json.load(open(p, encoding='utf-8'))
            except Exception as e:
                bad.append('%s: %s' % (os.path.basename(p), e))
                continue
            if hasattr(obj, '__len__') and len(obj) == 0:
                empty.append(os.path.basename(p))
        if bad:
            g.add('structured data parses', 'FAIL', '; '.join(bad[:3]))
        elif empty:
            g.add('structured data parses', 'FAIL', 'empty: %s' % ', '.join(empty))
        else:
            g.add('structured data parses', 'PASS', '%d file(s)' % len(jsons))

    # 8 route inventory
    inv = os.path.join(ref, 'routes')
    if os.path.isdir(inv):
        n = sum(1 for r, d, fs in os.walk(inv) for f in fs if f.endswith(('.html', '.gz')))
        g.add('route inventory explicit', 'PASS' if n else 'FAIL', '%s route capture(s)' % n)
    else:
        g.add('route inventory explicit', 'WARN',
              'no routes/ dir — confirm the target is genuinely single-page')

    w = max(len(r[0]) for r in g.rows)
    print('GATE 0 — %s' % ref)
    print('=' * (w + 58))
    for name, status, detail in g.rows:
        mark = {'PASS': ' ok ', 'WARN': 'warn', 'FAIL': 'FAIL', 'SKIP': 'skip'}[status]
        print('[%s] %-*s  %s' % (mark, w, name, detail))
    print('=' * (w + 58))
    print('GATE 0: BLOCKED — %d check(s) failed. Do NOT start implementation.' % len(g.failed)
          if g.failed else
          'GATE 0: CLEARED — reference is offline-remeasurable; implementation may start.')
    if args.json:
        json.dump([{'check': a, 'status': b, 'detail': c} for a, b, c in g.rows],
                  open(args.json, 'w', encoding='utf-8'), indent=2)
    return 1 if g.failed else 0


if __name__ == '__main__':
    sys.exit(main())
