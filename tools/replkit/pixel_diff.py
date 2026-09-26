"""Compare two full-page screenshots pixel by pixel, in strips to stay light.

Usage: python3 pixel_diff.py a.png b.png [--diff out.png] [--label name]
"""
import argparse
import os

import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
BAND = 400


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('a')
    ap.add_argument('b')
    ap.add_argument('--diff', default='')
    ap.add_argument('--label', default='')
    ap.add_argument('--threshold', type=int, default=8)
    args = ap.parse_args()

    ia = Image.open(args.a).convert('RGB')
    ib = Image.open(args.b).convert('RGB')
    if ia.size != ib.size:
        w = min(ia.size[0], ib.size[0])
        h = min(ia.size[1], ib.size[1])
        print('size mismatch ref=%s cand=%s -> cropping to %sx%s' % (ia.size, ib.size, w, h))
        ia = ia.crop((0, 0, w, h))
        ib = ib.crop((0, 0, w, h))
    w, h = ia.size

    out = Image.new('L', (w, h)) if args.diff else None
    total = w * h
    over = 0
    identical = 0
    acc = 0.0
    rows = []
    for y in range(0, h, BAND):
        bh = min(BAND, h - y)
        a = np.asarray(ia.crop((0, y, w, y + bh)), dtype=np.int16)
        b = np.asarray(ib.crop((0, y, w, y + bh)), dtype=np.int16)
        d = np.abs(a - b).max(axis=2).astype(np.uint8)
        acc += float(d.sum())
        over += int((d > args.threshold).sum())
        identical += int((d == 0).sum())
        rows.append(int((d > args.threshold).sum()))
        if out is not None:
            out.paste(Image.fromarray(d), (0, y))
        del a, b, d

    print('%s  ref=%s cand=%s' % (args.label or 'compare', ia.size, ib.size))
    print('   mean abs diff  : %.3f / 255' % (acc / total))
    print('   pixels > %d/255 : %d (%.3f%%)' % (args.threshold, over, 100.0 * over / total))
    print('   identical      : %.3f%%' % (100.0 * identical / total))
    bad = [i for i, r in enumerate(rows) if r > 0]
    if bad:
        print('   band range with diffs: rows %d..%d (of %d), worst band peak %d px'
              % (bad[0] * BAND, min(h, (bad[-1] + 1) * BAND), h, max(rows)))

    if args.diff:
        gray = ia.convert('L')
        heat = Image.merge('RGB', (out.point(lambda v: min(255, v * 4)),
                                   out.point(lambda v: 90 if v > args.threshold else 0),
                                   gray.point(lambda v: int(v * 0.35))))
        heat.save(args.diff, optimize=True)
        print('   diff image     :', args.diff, os.path.getsize(args.diff))


if __name__ == '__main__':
    main()
