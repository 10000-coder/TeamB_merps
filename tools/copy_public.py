#!/usr/bin/env python3
"""Copy the reference's own static assets into app/public, verbatim.

These are the site's real bytes (its compiled Tailwind output, its fonts, its
favicons, its root-served logo). They are copied rather than rebuilt so the port
cannot drift from the reference's own CSS.
"""
import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'reference' / 'site'
PUB = ROOT / 'app' / 'public'

GROUPS = [
    ('css', 'css/*.css'),
    ('fonts', 'fonts/*.woff2'),
    ('img', 'img/*'),
    ('root', None),        # logo.png / og.png, served from the site root
]


def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()


def main():
    manifest = {}
    for name, pattern in GROUPS:
        dest = PUB / ('' if name == 'root' else name)
        dest.mkdir(parents=True, exist_ok=True)
        files = (sorted(SRC.glob(pattern)) if pattern
                 else [SRC / 'logo.png', ROOT / 'reference' / 'assets' / 'root' / 'og.png'])
        for f in files:
            if not f.exists():
                print('MISSING', f)
                return 1
            out = dest / f.name
            shutil.copy2(f, out)
            manifest[str(out.relative_to(PUB))] = {
                'bytes': out.stat().st_size, 'sha256': sha(out)}
    (ROOT / 'build').mkdir(parents=True, exist_ok=True)
    (ROOT / 'build' / 'public_manifest.json').write_text(json.dumps(manifest, indent=1))
    print('copied %d assets into app/public' % len(manifest))
    for k in sorted(manifest):
        print('  %-40s %8d' % (k, manifest[k]['bytes']))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
