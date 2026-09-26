#!/usr/bin/env python3
"""Audit every asset reference in the original captures against what is on disk.

Lesson from the previous project: auditing only the manifest / <img src> misses
assets referenced from inline `style="mask-image:url(/logo.png)"`, from CSS
`url(...)`, and from RSC payload strings. Those silently became broken images.

Scans the ORIGINAL rendered captures (not the rewritten offline copy, which has
already had its paths rewritten), collects every root-absolute asset-looking URL,
and classifies each as present-on-disk / missing.
"""
import re
import json
import sys
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "reference"

# Root-absolute URLs that look like assets (have an extension) or known dirs.
PAT = re.compile(
    r"""["'(](/(?:[A-Za-z0-9_@%./-]*?\.(?:png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|css|js|mp4|json))
        |["'(](/(?:img|fonts|i|assets|_next|twimg)/[A-Za-z0-9_@%./-]+))""",
    re.X,
)


def norm(u: str) -> str:
    u = u.split("?")[0].split("#")[0]
    return re.sub(r"/+", "/", u) if u.startswith("/") else u


def disk_index():
    """Map every file in the reference package by basename and by path suffix."""
    idx = defaultdict(list)
    for p in REF.rglob("*"):
        if p.is_file():
            idx[p.name].append(str(p.relative_to(REF)))
    return idx


def main():
    idx = disk_index()
    all_missing = {}
    all_found = {}
    for f in sorted((REF / "rendered").glob("*.html")):
        html = f.read_text(errors="replace")
        refs = defaultdict(set)
        for m in PAT.finditer(html):
            u = norm(m.group(1) or m.group(2))
            if u:
                refs[u].add(1)
        missing, found = [], []
        for u in sorted(refs):
            base = u.rsplit("/", 1)[-1]
            if base in idx:
                found.append((u, idx[base][0]))
            else:
                missing.append(u)
        all_missing[f.stem] = missing
        all_found[f.stem] = found
        print(f"\n=== {f.stem}: {len(refs)} distinct refs, {len(found)} on disk, "
              f"{len(missing)} MISSING")
        for u in missing:
            n = html.count(u)
            print(f"    MISSING  {u}   (x{n})")
    (ROOT / "build").mkdir(parents=True, exist_ok=True)
    (ROOT / "build" / "asset_audit.json").write_text(json.dumps(
        {"missing": all_missing, "found": all_found}, indent=1))
    total = sum(len(v) for v in all_missing.values())
    print(f"\nTOTAL MISSING (union across routes): "
          f"{len(set().union(*all_missing.values())) if all_missing else 0}")
    return 0 if total == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
