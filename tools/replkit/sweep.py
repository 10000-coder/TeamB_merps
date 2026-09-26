#!/usr/bin/env python3
"""Run the verification matrix (geometry / pixels / text) over pages x widths.

Last project this harness was rewritten by hand, with hardcoded paths and variant
selectors, and it silently measured the wrong subtree more than once. Here the
project specifics live in a JSON config, so the harness is written once.

Config (replkit.json in the project root):
{
  "ref_root":  "shared/foo_reference/site",
  "cand_root": "shared/TeamB_foo/dist",
  "ref_page":  "{page}",                 # template, {page} is the bare path
  "cand_page": "{page}",
  "cand_spa_fallback": true,             # copy cand index.html into each route dir
  "ref_variants": {"light": {"desktop": ".vdl", "mobile": ".vml"},
                   "dark":  {"desktop": ".vdd", "mobile": ".vmd"}},
  "cand_variants": {"desktop": ".v", "mobile": ".v"},
  "theme_key": "aozi-theme",
  "pages": ["/", "/docs", "/flywheel"]
}

Usage:
  python3 sweep.py --config replkit.json --mode geom  /:1440 /docs:375
  python3 sweep.py --config replkit.json --mode pixel /docs:1440
  python3 sweep.py --config replkit.json --mode text  /:1440
  (append :dark to any spec, e.g. /:1440:dark)
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
TMP = os.environ.get('REPLKIT_TMP', '/tmp/replkit')


def sh(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    return (r.stdout or '').strip(), (r.stderr or '').strip(), r.returncode


def clean_tmp():
    """Chromium dies on this class of box when the disk is nearly full."""
    os.makedirs(TMP, exist_ok=True)
    for f in os.listdir(TMP):
        p = os.path.join(TMP, f)
        try:
            shutil.rmtree(p) if os.path.isdir(p) else os.remove(p)
        except OSError:
            pass
    st = shutil.disk_usage(TMP)
    free_mb = st.free / (1024.0 * 1024)
    if free_mb < 250:
        print('WARNING: only %.0f MB free on %s — Chromium may be killed' % (free_mb, TMP))
    return free_mb


class Ctx:
    def __init__(self, cfg):
        self.cfg = cfg
        self.approot = os.path.join(TMP, 'approot')
        self.ready = False

    def prep(self):
        if self.ready:
            return
        src = self.cfg['cand_root'].rstrip('/')
        dst = self.approot
        if os.path.isdir(dst):
            shutil.rmtree(dst)
        shutil.copytree(src, dst)
        if self.cfg.get('cand_spa_fallback'):
            index = os.path.join(dst, 'index.html')
            if os.path.exists(index):
                for page in self.cfg.get('pages', []):
                    rel = page.strip('/')
                    if not rel or page.startswith('/t/'):
                        continue
                    d = os.path.join(dst, rel)
                    os.makedirs(d, exist_ok=True)
                    shutil.copy2(index, os.path.join(d, 'index.html'))
        self.ready = True

    def page_path(self, root, tmpl, page):
        p = tmpl.replace('{page}', page)
        if p.startswith('/'):
            return root, p
        return os.path.join(root, p), '/index.html'

    def sides(self, page):
        c = self.cfg
        rroot, rpath = self.page_path(c['ref_root'], c.get('ref_page', '{page}index.html'),
                                      page if page != '/' else '/index.html')
        aroot, apath = self.page_path(self.approot, c.get('cand_page', '{page}index.html'),
                                      page if page != '/' else '/index.html')
        return rroot, rpath, aroot, apath

    def variants(self, page, width, theme):
        c = self.cfg
        band = 'mobile' if width < 900 else 'desktop'
        rv = (c.get('ref_variants', {}).get(theme, {}) or {}).get(band, '')
        av = (c.get('cand_variants', {}) or {}).get(band, '')
        if page.startswith('/t/') and c.get('cand_no_variant_on_token'):
            av = ''
        return rv, av


def geom(ctx, page, width, theme):
    ctx.prep()
    rroot, rpath, aroot, apath = ctx.sides(page)
    rv, av = ctx.variants(page, width, theme)
    tag = (page.strip('/').replace('/', '_') or 'home') + '_%d_%s' % (width, theme)
    ref_j = os.path.join(TMP, 'ref_%s.json' % tag)
    app_j = os.path.join(TMP, 'app_%s.json' % tag)
    height = 812 if width < 900 else 900
    tk = ctx.cfg.get('theme_key', 'theme')
    for root, path, out, variant in ((rroot, rpath, ref_j, rv), (aroot, apath, app_j, av)):
        args = [sys.executable, os.path.join(HERE, 'measure.py'), '--root', root, '--path', path,
                '--out', out, '--width', str(width), '--height', str(height), '--dpr', '1',
                '--theme', theme, '--variant', variant, '--theme-key', tk, '--freeze']
        _, err, rc = sh(args)
        if rc:
            print('%-40s %5d %-5s  MEASURE FAILED  %s' % (page, width, theme, err[-300:]))
            return None
    out, err, _ = sh([sys.executable, os.path.join(HERE, 'compare.py'), ref_j, app_j, '--worst', '4'])
    try:
        rh = json.load(open(ref_j))['docHeight']
        ch = json.load(open(app_j))['docHeight']
        els = json.load(open(app_j))['count']
    except Exception:
        rh = ch = els = '?'
    for p in (ref_j, app_j):
        try:
            os.remove(p)
        except OSError:
            pass

    def field(name):
        m = re.search(re.escape(name) + r'\s*:\s*([0-9.]+%)', out)
        return m.group(1) if m else '?'

    print('%-40s %5d %-5s  els=%-6s geom=%-8s styles=%-8s docH ref=%s cand=%s'
          % (page, width, theme, els, field('rect within 0.75px'),
             field('styles identical'), rh, ch))
    return out


def pixel(ctx, page, width, theme):
    ctx.prep()
    rroot, rpath, aroot, apath = ctx.sides(page)
    rv, av = ctx.variants(page, width, theme)
    tag = (page.strip('/').replace('/', '_') or 'home') + '_%d_%s' % (width, theme)
    a = os.path.join(TMP, 'r_%s.png' % tag)
    b = os.path.join(TMP, 'a_%s.png' % tag)
    d = os.path.join(TMP, 'd_%s.png' % tag)
    tk = ctx.cfg.get('theme_key', 'theme')
    for root, path, out, variant in ((rroot, rpath, a, rv), (aroot, apath, b, av)):
        _, err, rc = sh([sys.executable, os.path.join(HERE, 'shoot.py'), '--root', root,
                         '--path', path, '--width', str(width), '--theme', theme, '--variant',
                         variant, '--theme-key', tk, '--out', out, '--absolute-bg', '--freeze'])
        if rc:
            print('%-40s %5d %-5s  SHOOT FAILED  %s' % (page, width, theme, err[-300:]))
            return None
    out, err, _ = sh([sys.executable, os.path.join(HERE, 'pixel_diff.py'), a, b,
                      '--label', tag, '--diff', d])
    print('== pixels %s %dx%s' % (page, width, theme))
    print(out or err[-400:])
    return out


def text(ctx, page, width, theme):
    ctx.prep()
    rroot, rpath, aroot, apath = ctx.sides(page)
    rv, av = ctx.variants(page, width, theme)
    tk = ctx.cfg.get('theme_key', 'theme')
    out, err, rc = sh([sys.executable, os.path.join(HERE, 'textdiff.py'),
                       '--ref-root', rroot, '--ref-path', rpath, '--ref-variant', rv,
                       '--cand-root', aroot, '--cand-path', apath, '--cand-variant', av,
                       '--width', str(width), '--theme', theme, '--theme-key', tk, '--show', '10'])
    print('== text %s %dx%s' % (page, width, theme))
    print(out or err[-400:])
    return out


def parse_spec(spec):
    parts = spec.split(':')
    page = parts[0] or '/'
    width = int(parts[1]) if len(parts) > 1 and parts[1] else 1440
    theme = parts[2] if len(parts) > 2 and parts[2] else 'light'
    return page, width, theme


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--config', required=True)
    ap.add_argument('--mode', choices=['geom', 'pixel', 'text'], default='geom')
    ap.add_argument('specs', nargs='*')
    ap.add_argument('--all', action='store_true', help='config pages x 1440/375 x light/dark')
    args = ap.parse_args()

    cfg = json.load(open(args.config, encoding='utf-8'))
    for k in ('ref_root', 'cand_root'):
        if k not in cfg:
            print('config missing %s' % k)
            return 2
        cfg[k] = os.path.abspath(cfg[k])
    clean_tmp()
    ctx = Ctx(cfg)

    specs = list(args.specs)
    if args.all:
        specs = ['%s:%d:%s' % (p, w, t) for p in cfg.get('pages', ['/'])
                 for w in (1440, 375) for t in ('light', 'dark')]
    if not specs:
        print('no specs given (use /:1440 or --all)')
        return 2

    fn = {'geom': geom, 'pixel': pixel, 'text': text}[args.mode]
    for s in specs:
        page, width, theme = parse_spec(s)
        fn(ctx, page, width, theme)
    return 0


if __name__ == '__main__':
    sys.exit(main())
