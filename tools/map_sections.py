#!/usr/bin/env python3
"""Map the page-builder sections: each section's tag/class, subtree size, text preview."""
import sys
from pathlib import Path
from bs4 import BeautifulSoup

REF = Path(__file__).resolve().parent.parent / "reference"


def main():
    route = sys.argv[1] if len(sys.argv) > 1 else "index"
    soup = BeautifulSoup((REF / "site" / f"{route}.html").read_text(errors="replace"),
                         "html.parser")
    print(f"### {route}")
    for sec in soup.find_all(attrs={"data-page-builder-section": True}):
        name = sec["data-page-builder-section"]
        n = len(sec.find_all(True))
        txt = " ".join(sec.get_text(" ", strip=True).split())[:220]
        cls = " ".join((sec.get("class") or [])[:3])
        print(f"\n--- {name}  |  <{sec.name} class='{cls}'>  |  {n} descendants")
        print(f"    text: {txt}")
    # top-level structure of main
    main = soup.find("main")
    if main:
        print("\n### main children")
        for c in main.find_all(recursive=False):
            print(f"  <{c.name} class='{' '.join((c.get('class') or [])[:3])}'> "
                  f"{len(c.find_all(True))} desc  {c.get('data-page-builder-section','')}")
    for tag in ("header", "footer", "nav"):
        for el in soup.find_all(tag):
            print(f"\n### {tag} parents={[p.name for p in el.parents][:3]} "
                  f"desc={len(el.find_all(True))}")


if __name__ == "__main__":
    main()
