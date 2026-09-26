"""Convert a captured HTML fragment into faithful React (TSX) markup.

Inline style strings are preserved verbatim through the `sx()` helper instead of
being re-authored as objects, so the port cannot drift from the reference by
transcription error.

Usage:
  python3 html_to_jsx.py <fragment.html> <ComponentName> <out.tsx> [--export-style-string]
"""
import json
import os
import re
import sys

from bs4 import BeautifulSoup, NavigableString, Tag

ATTR = {
    'class': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex',
    'viewbox': 'viewBox', 'preserveaspectratio': 'preserveAspectRatio',
    'clip-rule': 'clipRule', 'fill-rule': 'fillRule', 'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin',
    'stroke-dasharray': 'strokeDasharray', 'stroke-miterlimit': 'strokeMiterlimit',
    'fill-opacity': 'fillOpacity', 'stroke-opacity': 'strokeOpacity',
    'dominant-baseline': 'dominantBaseline', 'text-anchor': 'textAnchor',
    'letter-spacing': 'letterSpacing', 'font-size': 'fontSize', 'font-family': 'fontFamily',
    'font-weight': 'fontWeight', 'font-style': 'fontStyle', 'clip-path': 'clipPath',
    'stop-color': 'stopColor', 'xlink:href': 'xlinkHref', 'aria-hidden': 'aria-hidden',
    'inputmode': 'inputMode', 'autocomplete': 'autoComplete', 'datetime': 'dateTime',
    'srcset': 'srcSet', 'maxlength': 'maxLength', 'readonly': 'readOnly',
    'colspan': 'colSpan', 'rowspan': 'rowSpan', 'contenteditable': 'contentEditable',
}
BOOLISH = {'async', 'defer', 'disabled', 'checked', 'selected', 'multiple', 'required', 'hidden'}
VOID = {'img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'area', 'base', 'col',
        'embed', 'track', 'wbr', 'path', 'circle', 'rect', 'line', 'polygon', 'polyline',
        'ellipse', 'stop', 'use'}


def camel(name):
    parts = name.split('-')
    return parts[0] + ''.join(p[:1].upper() + p[1:] for p in parts[1:])


def jsx_text(text):
    if not text.strip():
        return None
    if not text.strip() and text:
        return None
    t = text.replace('\n', ' ').replace('\r', ' ')
    while '  ' in t:
        t = t.replace('  ', ' ')
    return t


def render(node, depth, out, ctx, preserve=False):
    pad = '  ' * depth
    first = True
    for ch in node.children:
        if isinstance(ch, NavigableString):
            txt = str(ch)
            if preserve:
                # inside <pre>/<textarea> whitespace is content, not formatting
                if first and txt.startswith('\n'):
                    txt = txt[1:]
                if txt:
                    out.append('%s{%s}' % (pad, json.dumps(txt)))
                first = False
                continue
            if not txt.strip():
                first = False
                continue
            cleaned = re.sub(r'\s+', ' ', txt)
            if not cleaned.strip():
                first = False
                continue
            out.append('%s{%s}' % (pad, json.dumps(cleaned)))
            first = False
        elif isinstance(ch, Tag):
            out.append('%s%s' % (pad, open_tag(ch, ctx)))
            if ch.name in VOID:
                out[-1] += ' />'
                continue
            out[-1] += '>'
            render(ch, depth + 1, out, ctx, preserve or ch.name in ('pre', 'textarea'))
            out.append('%s</%s>' % (pad, ch.name))
            first = False
    return out


def open_tag(el, ctx):
    attrs = []
    for k, v in el.attrs.items():
        if isinstance(v, list):
            v = ' '.join(v)
        if k == 'style':
            attrs.append('style={sx(%s)}' % json.dumps(v))
            continue
        if k == 'onerror':
            if 'removeAttribute' in v:
                attrs.append('onError={onImgError}')
            else:
                attrs.append('onError={onImgErrorHide}')
            continue
        if k == 'onclick' or k == 'onload':
            continue
        key = ATTR.get(k, k)
        if key == 'className':
            attrs.append('className=%s' % json.dumps(v))
            continue
        if key in BOOLISH and v == '':
            attrs.append(key)
            continue
        if v == '':
            attrs.append('%s=""' % key)
            continue
        attrs.append('%s=%s' % (key, json.dumps(v)))
    joined = ' '.join(attrs)
    return '<%s%s' % (el.name, (' ' + joined) if joined else '')


def convert(html, component, header=''):
    soup = BeautifulSoup(html, 'html.parser')
    roots = [c for c in soup.children if isinstance(c, Tag)]
    body = []
    for r in roots:
        if r.name == 'fragment':
            render(r, 2, body, None)
            continue
        body.append('  ' + open_tag(r, None) + '>')
        render(r, 2, body, None)
        body.append('</%s>' % r.name)
    lines = [header] if header else []
    lines.append('export function %s() {' % component)
    lines.append('  return (')
    lines.append('    <>')
    lines += body
    lines.append('    </>')
    lines.append('  );')
    lines.append('}')
    return '\n'.join(lines) + '\n'


if __name__ == '__main__':
    src, comp, dst = sys.argv[1], sys.argv[2], sys.argv[3]
    html = open(src, encoding='utf-8').read()
    header = None
    if '--header' in sys.argv:
        header = sys.argv[sys.argv.index('--header') + 1]
    out = convert(html, comp, header)
    open(dst, 'w', encoding='utf-8').write(out)
    print('wrote', dst, len(out))
