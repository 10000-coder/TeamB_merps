#!/usr/bin/env python3
"""Localize pixel differences into bounding boxes, so a diff can be attributed.

`pixel_diff.py` says *how much* differs and in which horizontal band. That is not
enough to fix anything: you need to know *what* is wrong and *where*. This groups
differing pixels into connected clusters and reports each one's bbox, size, peak
delta and the dominant colours on each side.

Usage:
  python3 localize_diff.py A.png B.png [--min-pixels 8] [--max-clusters 40]
"""
import argparse
import sys
from collections import Counter
from pathlib import Path

import numpy as np
from PIL import Image


def clusters(mask, min_pixels, max_clusters):
    """Connected components over the diff mask, 8-connected, iterative flood fill."""
    h, w = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    out = []
    ys, xs = np.nonzero(mask)
    for y0, x0 in zip(ys, xs):
        if seen[y0, x0]:
            continue
        stack = [(y0, x0)]
        seen[y0, x0] = True
        pts = []
        while stack:
            y, x = stack.pop()
            pts.append((y, x))
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        stack.append((ny, nx))
        if len(pts) >= min_pixels:
            arr = np.array(pts)
            out.append((len(pts), arr[:, 0].min(), arr[:, 0].max(),
                        arr[:, 1].min(), arr[:, 1].max(), arr))
    out.sort(key=lambda c: -c[0])
    return out[:max_clusters]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('a')
    ap.add_argument('b')
    ap.add_argument('--min-pixels', type=int, default=8)
    ap.add_argument('--max-clusters', type=int, default=40)
    ap.add_argument('--label', default='')
    args = ap.parse_args()

    A = np.asarray(Image.open(args.a).convert('RGB'), dtype=np.int16)
    B = np.asarray(Image.open(args.b).convert('RGB'), dtype=np.int16)
    if A.shape != B.shape:
        print(f'size mismatch: {A.shape} vs {B.shape}')
        return 2
    d = np.abs(A - B).max(axis=2)
    mask = d > 0
    print(f'{args.label or ""} diff pixels={int(mask.sum())} of {mask.size} '
          f'({100.0 * mask.sum() / mask.size:.3f}%)  peak={int(d.max())}')
    for i, (n, y0, y1, x0, x1, pts) in enumerate(clusters(mask, args.min_pixels,
                                                           args.max_clusters)):
        sub_a = A[y0:y1 + 1, x0:x1 + 1].reshape(-1, 3)
        sub_b = B[y0:y1 + 1, x0:x1 + 1].reshape(-1, 3)
        ca = Counter(map(tuple, sub_a))[()] if False else Counter(map(tuple, sub_a))
        cb = Counter(map(tuple, sub_b))
        peak = int(d[y0:y1 + 1, x0:x1 + 1].max())
        print(f'  #{i+1:02d} {n:>6} px  bbox y {y0}-{y1} x {x0}-{x1} '
              f'({x1-x0+1}x{y1-y0+1})  peak {peak}')
        print(f'       A top: {ca.most_common(3)}')
        print(f'       B top: {cb.most_common(3)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
