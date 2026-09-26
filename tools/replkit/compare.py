"""Compare two measure.py dumps element-by-element (geometry + key styles).

Usage: python3 compare.py ref.json cand.json [--tol 0.75] [--worst 25]
"""
import argparse
import json
import sys

STYLE_KEYS = ['fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'color',
              'backgroundColor', 'backgroundImage', 'borderRadius', 'display',
              'position', 'padding', 'margin', 'gap', 'boxShadow', 'opacity',
              'flexDirection', 'gridTemplateColumns', 'justifyContent', 'alignItems',
              'textAlign', 'overflow', 'objectFit', 'borderTopColor', 'filter']


def load(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)


def path_of(items, i):
    parts = []
    d = items[i]['d']
    j = i
    while j >= 0 and len(parts) < 6:
        it = items[j]
        if it['d'] < d:
            d = it['d']
            parts.append('%s%s' % (it['t'], ('.' + it['c'].replace(' ', '.') if it['c'] else '')))
        j -= 1
    return ' > '.join(reversed(parts))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('ref')
    ap.add_argument('cand')
    ap.add_argument('--tol', type=float, default=0.75)
    ap.add_argument('--worst', type=int, default=25)
    args = ap.parse_args()

    a = load(args.ref)
    b = load(args.cand)
    ia, ib = a['items'], b['items']
    print('ref  elements=%d docHeight=%d docWidth=%d' % (a['count'], a['docHeight'], a['docWidth']))
    print('cand elements=%d docHeight=%d docWidth=%d' % (b['count'], b['docHeight'], b['docWidth']))
    n = min(len(ia), len(ib))
    rect_ok = 0
    style_ok = 0
    tag_ok = 0
    cls_ok = 0
    drift = []
    style_drift = []
    for i in range(n):
        x, y = ia[i], ib[i]
        if x['t'] == y['t']:
            tag_ok += 1
        if x['c'] == y['c']:
            cls_ok += 1
        d = max(abs(x['r'][k] - y['r'][k]) for k in range(4))
        if d <= args.tol:
            rect_ok += 1
        else:
            drift.append((d, i, x, y))
        bad = [k for k in STYLE_KEYS if x['s'].get(k) != y['s'].get(k)]
        if not bad:
            style_ok += 1
        else:
            style_drift.append((len(bad), i, x, y, bad))

    print('aligned          : %d / %d' % (n, max(len(ia), len(ib))))
    print('tag match        : %.2f%%' % (100.0 * tag_ok / n))
    print('class match      : %.2f%%' % (100.0 * cls_ok / n))
    print('rect within %.2fpx : %.2f%%  (%d/%d)' % (args.tol, 100.0 * rect_ok / n, rect_ok, n))
    print('styles identical : %.2f%%  (%d/%d)' % (100.0 * style_ok / n, style_ok, n))

    drift.sort(reverse=True, key=lambda t: t[0])
    print('\n--- worst geometry drift ---')
    for d, i, x, y, in drift[:args.worst]:
        print('%.1fpx  %s' % (d, path_of(ib, i)))
        print('        ref  %s %s %s' % (x['t'], x['c'][:40], x['r']))
        print('        cand %s %s %s' % (y['t'], y['c'][:40], y['r']))

    style_drift.sort(reverse=True, key=lambda t: t[0])
    print('\n--- worst style drift ---')
    for c, i, x, y, bad in style_drift[:args.worst]:
        print('%d prop(s) %s' % (c, path_of(ib, i)))
        for k in bad[:6]:
            print('        %-18s ref=%s cand=%s' % (k, str(x['s'].get(k))[:60], str(y['s'].get(k))[:60]))


if __name__ == '__main__':
    main()
