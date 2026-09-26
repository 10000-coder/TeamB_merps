#!/usr/bin/env python3
"""Structural recon of a captured route: section map, chrome, and *indirect* asset refs.

Why this exists: the first replica round shipped with missing images because asset
auditing only looked at the manifest/`<img src>`. Assets referenced from inline
`style="mask-image:url(/logo.png)"` or from CSS `url(...)` were invisible to it.
This script finds refs from all four places: <img>, <link>, inline style, and CSS.
"""
import re
import sys
import json
from pathlib import Path
from collections import Counter

from bs4 import BeautifulSoup

REF = Path(__file__).resolve().parent.parent / "reference"


def walk(node, depth=0, out=None, maxdepth=6):
    """Print a compact tree of tag.class[#id] up to maxdepth."""
    if out is None:
        out = []
    if depth > maxdepth:
        return out
    if getattr(node, "name", None):
        cls = node.get("class") or []
        cls = [c for c in cls if not re.match(r"^(css|sc|module)__", c)][:4]
        ident = node.get("id")
        anchor = node.get("data-page-builder-section")
        bits = node.name
        if ident:
            bits += "#" + ident
        if cls:
            bits += "." + ".".join(cls)
        if anchor:
            bits += f"[{anchor}]"
        out.append("  " * depth + bits)
    for child in getattr(node, "children", []):
        if getattr(child, "name", None):
            walk(child, depth + 1, out, maxdepth)
    return out


def indirect_refs(html: str):
    """Asset refs that a naive <img>/<link> scan misses."""
    pats = {
        "inline_style_url": r'style="[^"]*url\(([^)"\']+)\)',
        "css_url": r"url\((['\"]?)(/[^)\"']+)\1\)",
        "mask_image": r"mask-image:\s*url\(([^)]+)\)",
        "srcset": r'srcset="([^"]+)"',
        "poster": r'poster="([^"]+)"',
    }
    found = {}
    for name, pat in pats.items():
        hits = Counter(m.group(1) if m.groups() else m.group(0)
                       for m in re.finditer(pat, html))
        if hits:
            found[name] = dict(hits)
    return found


def main():
    routes = sys.argv[1:] or ["index", "trade", "trade-options", "portfolio", "list-token"]
    report = {}
    for r in routes:
        f = REF / "site" / f"{r}.html"
        if not f.exists():
            print(f"!! missing {f}")
            continue
        html = f.read_text(encoding="utf-8", errors="replace")
        soup = BeautifulSoup(html, "html.parser")
        body = soup.body
        out = walk(body, 0, [], 7)
        print(f"\n{'='*78}\n### {r}  ({len(out)} nodes shown, {len(html)} bytes)\n{'='*78}")
        print("\n".join(out[:120]))
        refs = indirect_refs(html)
        print(f"\n-- indirect asset refs ({r}) --")
        print(json.dumps(refs, indent=1)[:2500])
        report[r] = {"nodes": len(out), "indirect": refs}
    (ROOT / "build").mkdir(parents=True, exist_ok=True)
    (ROOT / "build" / "dom_report.json").write_text(json.dumps(report, indent=1))


if __name__ == "__main__":
    main()
