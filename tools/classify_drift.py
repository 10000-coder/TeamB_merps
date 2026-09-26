#!/usr/bin/env python3
"""Classify geometry/style drift between two measure.py dumps.

Dump format (compact, pre-order): items = [{i,d,t,c,r,x,s}] with d=depth,
r=rect as a literal string, s=computed style as a literal dict string.
Ancestry is reconstructed from depth, so a differing element can be attributed
to the section that contains it.

Purpose: the port now hydrates, and the frozen reference copy is a
PRE-hydration render, so elements the site's own JS rewrites on mount may
legitimately differ. This answers how tightly that drift is confined.
"""
import ast
import json
import sys
from collections import Counter


def load(p):
    d = json.load(open(p))
    return d, d['items']


def rect(e):
    v = e['r']
    if isinstance(v, str):
        try:
            return ast.literal_eval(v)
        except Exception:
            return None
    return v


def style(e):
    v = e['s']
    if isinstance(v, str):
        try:
            return ast.literal_eval(v)
        except Exception:
            return None
    return v


def label(e, path):
    return '%s.%s  @y=%s  <= %s' % (
        e['t'], (e['c'] or '')[:60],
        (rect(e) or ['?'])[1] if rect(e) else '?',
        path[-110:],
    )


def build_paths(items):
    """Return a list of short ancestry strings, one per item."""
    out = []
    stack = []  # (depth, short name)
    for e in items:
        d = int(e['d'])
        while stack and stack[-1][0] >= d:
            stack.pop()
        stack.append((d, '%s.%s' % (e['t'], (e['c'] or '')[:28])))
        out.append(' > '.join(s[1] for s in stack[-4:]))
    return out


def main():
    _, ref = load(sys.argv[1])
    _, can = load(sys.argv[2])
    print('ref %d / cand %d elements' % (len(ref), len(can)))
    paths = build_paths(ref)
    tol = 0.75
    geom = Counter()
    styd = Counter()
    exg = {}
    exs = {}
    for k, (a, b) in enumerate(zip(ref, can)):
        ra, rb = rect(a), rect(b)
        if ra and rb and max(abs(ra[i] - rb[i]) for i in range(4)) > tol:
            key = label(a, paths[k])
            geom[key] += 1
            exg.setdefault(key, (ra, rb))
        sa, sb = style(a), style(b)
        if isinstance(sa, dict) and isinstance(sb, dict):
            diff = [p for p in set(sa) | set(sb) if sa.get(p) != sb.get(p)]
            if diff:
                key = label(a, paths[k])
                styd[key] += 1
                exs.setdefault(key, ({p: sa.get(p) for p in diff}, {p: sb.get(p) for p in diff}))
    print('\n== geometry drift > %.2fpx: %d element(s), %d distinct path(s) =='
          % (tol, sum(geom.values()), len(geom)))
    for k, v in geom.most_common(10):
        print('  %3dx  %s' % (v, k))
        print('        ref=%s' % (exg[k],))
        print('        cand=%s' % (exg[k][1],))
    print('\n== style drift: %d element(s), %d distinct path(s) ==' % (sum(styd.values()), len(styd)))
    for k, v in styd.most_common(10):
        print('  %3dx  %s' % (v, k))
        print('        ref=%s' % (exs[k][0],))
        print('        cand=%s' % (exs[k][1],))

    # Which ancestor subtree contains all the drift?
    print('\n== containing subtree of every differing element ==')
    hits = Counter()
    for k, (a, b) in enumerate(zip(ref, can)):
        ra, rb = rect(a), rect(b)
        g = bool(ra and rb and max(abs(ra[i] - rb[i]) for i in range(4)) > tol)
        sa, sb = style(a), style(b)
        sv = bool(isinstance(sa, dict) and isinstance(sb, dict)
                  and any(sa.get(p) != sb.get(p) for p in set(sa) | set(sb)))
        if g or sv:
            for seg in paths[k].split(' > '):
                hits[seg] += 1
    for seg, n in hits.most_common(12):
        print('  %3d  %s' % (n, seg))


if __name__ == '__main__':
    main()
