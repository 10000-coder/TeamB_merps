#!/usr/bin/env python3
"""Generate the React port of merps.co from the frozen captures.

Design (from the previous project's retrospective):
  * the port is MECHANICAL. Markup comes from the captured DOM via
    `replkit/html_to_jsx.py`, so it cannot drift by transcription error.
    Inline `style` strings are passed through verbatim by `sx()`.
  * the chrome is deduplicated by CONTENT HASH, not by assumption. The header and
    mobile menu genuinely differ per route (the contextual CTA changes:
    `Start trading` -> /trade on the home page, `Trade options` -> /trade/options
    inside the app). Assuming one shared header would have been wrong.
  * the ONLY hand-written part is the region that needs data: the settled market
    list. It is threaded in through an explicit `<x-slot>` so the substitution is
    counted and asserted (exactly 1 on /trade and /trade/options, 0 elsewhere).

Output is deterministic: no timestamps, stable naming by content hash order.
"""
import hashlib
import json
import re
import shutil
import sys
from pathlib import Path

from bs4 import BeautifulSoup, Tag

HERE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(HERE / 'tools' / 'replkit'))
from html_to_jsx import VOID, open_tag, render   # noqa: E402

SITE = HERE / 'reference' / 'site'
OUT = HERE / 'app'
GEN = OUT / 'src' / 'gen'

ROUTES = [
    ('/', 'index'),
    ('/trade', 'trade'),
    ('/trade/options', 'trade-options'),
    ('/portfolio', 'portfolio'),
    ('/list-token', 'list-token'),
]

# The one data-driven region: the SSR capture froze "Loading markets...", the
# settled page has the market list. Replaced by a slot the page fills.
SLOT_TEXT = 'Loading markets...'


def wants(path, slot):
    return slot in EXPECT_SLOTS.get(path, [])


def chart_figure(main_el):
    """The `desk-figure` inside the section labelled "Chart".

    The same `span.desk-figure` pattern also appears under "Desk balance", where
    `-` is the correct settled value for an unconnected wallet and must be kept.
    """
    out = []
    for sec in main_el.select('section.desk-panel'):
        head = sec.find(recursive=False)
        if head is None:
            continue
        label = head.find('span')
        if label is None or label.get_text(strip=True) != 'Chart':
            continue
        out.extend(sec.select('span.desk-figure'))
    return out


def chart_header(main_el):
    """The header div of the section labelled "Chart" (holds the price block)."""
    out = []
    for sec in main_el.select('section.desk-panel'):
        head = sec.find(recursive=False)
        if head is None:
            continue
        label = head.find('span')
        if label is not None and label.get_text(strip=True) == 'Chart':
            out.append(head)
    return out


EXPECT_SLOTS = {
    '/trade': ['marketList', 'chart', 'chartFigure', 'chartIntervals'],
    '/trade/options': ['marketList'],
}

# The tab chips and the search box live in the generated markup but are real
# controls. Label -> tab key, taken from the reference's own tab list.
CHIP_TABS = {'Meme coins': 'memecoin', 'Stocks': 'stock', 'Listed': 'custom'}


def public_asset_names():
    """Files the app serves from its web root (app/public)."""
    pub = OUT / 'public'
    names = set()
    if pub.is_dir():
        for f in pub.rglob('*'):
            if f.is_file():
                names.add(f.name)
    return names


def absolutise_urls(soup, names):
    """Rewrite `url(logo.png)` -> `url(/logo.png)` inside inline styles.

    The offline reference copy makes these RELATIVE so it can be served from any
    document root. The app cannot: its pages live at `/`, `/portfolio/`,
    `/trade/options/`, ... so a relative `url(logo.png)` only resolves on the home
    page and 404s everywhere else -- which silently turned the masked MERPS logo
    into a solid block on every non-root route.
    """
    n = 0
    for el in soup.find_all(style=True):
        style = el.get('style') or ''
        if 'url(' not in style:
            continue
        def fix(m):
            nonlocal n
            raw = m.group(1).strip('"\'')
            if raw.startswith(('/', 'data:', 'http', '#')):
                return m.group(0)
            if raw.rsplit('/', 1)[-1] not in names:
                return m.group(0)
            n += 1
            return 'url(/%s)' % raw.lstrip('./')
        new_style = re.sub(r'url\(([^)]+)\)', fix, style)
        if new_style != style:
            el['style'] = new_style
    return n


def h8(s):
    return hashlib.sha256(s.encode()).hexdigest()[:8]


def emit_element(el, depth, out):
    tag = open_tag(el, None)
    pad = '  ' * depth
    if el.name in VOID:
        out.append(pad + tag + ' />')
        return
    out.append(pad + tag + '>')
    render(el, depth + 1, out, None)
    out.append('%s</%s>' % (pad, el.name))


SX_CALL_RE = re.compile(r'sx\(("(?:[^"\\]|\\.)*")\)')


def menu_open_style(closed: str) -> str:
    """Derive the OPEN state from the captured CLOSED state.

    The capture only ever holds the menu closed, so the open values must come from
    somewhere. Rather than invent an animation, this completes the one the markup
    already declares: the closed state is the *start* of an entrance transition
    (`opacity:0`, `transform:translateY(...)`, `visibility:hidden`), so the open
    state is that same declaration with the entrance finished. Transition timing is
    left exactly as captured, including the per-link stagger delays.
    """
    out = closed
    out = re.sub(r'(^|;)visibility:hidden', r'\1visibility:visible', out)
    out = re.sub(r'(^|;)pointer-events:none', r'\1pointer-events:auto', out)
    out = re.sub(r'(^|;)opacity:0(?=;|$)', r'\1opacity:1', out)
    out = re.sub(r'(^|;)transform:translateY\([^)]*\)', r'\1transform:none', out)
    return out


def apply_interaction(name, kind, src):
    """Wire the two real controls, and give the menu an open state."""
    notes = []
    if kind == 'header':
        src = src.replace("import { sx, onImgError, onImgErrorHide } from '../../lib/dom';",
                          "import { sx, onImgError, onImgErrorHide } from '../../lib/dom';\n"
                          "import { toggleTheme, toggleMenu } from '../../lib/ui';")
        # theme toggle, identified by the reference's own accessible name
        pat = re.compile(r'(<button[^>]*aria-label="Toggle theme"[^>]*?)>')
        src, n = pat.subn(r'\1 onClick={toggleTheme}>', src)
        notes.append(('theme-toggle', n))
        pat2 = re.compile(r'(<button[^>]*aria-expanded="false"[^>]*?)>')
        src, n2 = pat2.subn(r'\1 onClick={toggleMenu}>', src)
        notes.append(('menu-toggle', n2))
    if kind == 'main':
        rewired = [0]

        def chip(m):
            # group 1 = button open tag, 2 = the {\"label\"} child, 3 = the label literal
            head = m.group(1)
            child = m.group(2)
            key = CHIP_TABS.get(json.loads(m.group(3)))
            if key is None:
                return m.group(0)       # a different chip group: leave mechanical
            head = re.sub(r'data-active="[^"]*"', 'data-active={tab === %s}' % json.dumps(key), head)
            if 'onClick' not in head:
                head = head[:-1] + ' onClick={() => setTab(%s)}>' % json.dumps(key)
            rewired[0] += 1
            return head + child

        pat = re.compile(
            r'(<button\b[^>]*className="desk-chip"[^>]*?>)(\s*\{("(?:[^"\\]|\\.)*")\})')
        src = pat.sub(chip, src)
        n = rewired[0]
        notes.append(('chips', n))

        def search(m):
            head = m.group(1).strip()
            if 'onChange' in head:
                return m.group(0)
            # drop the SSR initial value, then swap it for controlled props
            head = re.sub(r'\s*defaultValue=""', '', head)
            assert head.endswith('/>'), head
            head = head[:-2].rstrip()
            return head + ' value={query} onChange={(e) => setQuery(e.target.value)} />'
        pat2 = re.compile(r'(<input\b[^>]*className="[^"]*desk-search"[^>]*?/>)')
        src, n2 = pat2.subn(search, src)
        notes.append(('search', n2))

        if n or n2:
            src = src.replace(
                "import { sx, onImgError, onImgErrorHide } from '../../lib/dom';",
                "import { sx, onImgError, onImgErrorHide } from '../../lib/dom';\n"
                "import { useDesk } from '../../desk/DeskContext';")
            src = re.sub(r'(export function \w+\([^)]*\) \{)',
                         r'\1\n  const { tab, setTab, query, setQuery } = useDesk();', src, count=1)
    if kind == 'menu':
        def sub(m):
            closed = json.loads(m.group(1))
            return 'sx(open ? %s : %s)' % (
                json.dumps(menu_open_style(closed)), m.group(1))
        src, n = SX_CALL_RE.subn(sub, src)
        notes.append(('menu-style', n))
        src = src.replace('aria-hidden="true"', 'aria-hidden={open ? "false" : "true"}')
        src = src.replace('export function %s() {' % name,
                          'export function %s() {\n  const open = useMenuOpen();' % name)
        src = src.replace("import { sx, onImgError, onImgErrorHide } from '../../lib/dom';",
                          "import { sx, onImgError, onImgErrorHide } from '../../lib/dom';\n"
                          "import { useMenuOpen, useChromeHandlers } from '../../lib/ui';")
    return src, notes


def gen_component(name, els, slots=()):
    props = ''
    if slots:
        names = ', '.join(slots)
        types = '; '.join('%s: React.ReactNode' % s for s in slots)
        props = '{ %s }: { %s }' % (names, types)
    lines = [
        "import { sx, onImgError, onImgErrorHide } from '../../lib/dom';",
        '',
        'export function %s(%s) {' % (name, props),
        '  return (',
        '    <>',
    ]
    for el in els:
        emit_element(el, 3, lines)
    lines += ['    </>', '  );', '}']
    return '\n'.join(lines) + '\n'


def main():
    parts_dir = GEN / 'parts'
    if parts_dir.exists():
        shutil.rmtree(parts_dir)
    parts_dir.mkdir(parents=True)

    pub_names = public_asset_names()
    interaction_notes = {}
    by_hash = {}          # hash -> (kind, name, els)
    route_seq = {}        # route -> [ (kind, hash) ]
    route_meta = {}
    manifest = {'routes': {}, 'parts': {}, 'slots': {}, 'dedupe': {}}

    for path, stem in ROUTES:
        html = (SITE / ('%s.html' % stem)).read_text(errors='replace')
        soup = BeautifulSoup(html, 'html.parser')
        main_el = soup.body.find('main')

        url_notes = 0

        # --- substitute the data-driven regions ----------------------------
        # The SSR capture holds three "nothing selected yet" placeholders. Each is
        # replaced by an explicitly named slot; the counts are asserted below so a
        # missing or duplicated replacement cannot pass silently.
        slots = []
        if main_el is not None:
            def fill(target, slot_name):
                tag = soup.new_tag('x-slot')
                tag['data-slot'] = slot_name
                target.replace_with(tag)
                slots.append(slot_name)

            if wants(path, 'marketList'):
                found = [q for q in main_el.find_all('p')
                         if q.get_text(strip=True) == SLOT_TEXT
                         and not q.find_all(True)]
                if len(found) == 1:
                    fill(found[0], 'marketList')
            if wants(path, 'chart'):
                found = main_el.select('.desk-chart-empty')
                if len(found) == 1:
                    fill(found[0], 'chart')
            if wants(path, 'chartFigure'):
                found = chart_figure(main_el)
                if len(found) == 1:
                    fill(found[0], 'chartFigure')
            if wants(path, 'chartIntervals'):
                # The reference renders the interval chips only when a chart
                # exists, so the SSR capture has no element to replace -- the slot
                # is APPENDED to the chart header instead.
                heads = chart_header(main_el)
                if len(heads) == 1:
                    tag = soup.new_tag('x-slot')
                    tag['data-slot'] = 'chartIntervals'
                    heads[0].append(tag)
                    slots.append('chartIntervals')
        manifest['slots'][path] = slots

        seq = []
        for child in soup.body.find_all(recursive=False):
            if child.name == 'script':
                continue
            if child.name == 'header':
                kind = 'header'
            elif child.name == 'div' and child.get('id') == 'site-mobile-menu':
                kind = 'menu'
            elif child.name == 'footer':
                kind = 'footer'
            elif child.name == 'main':
                kind = 'main'
            else:
                kind = 'extra'
            url_notes += absolutise_urls(child, pub_names)
            markup = str(child)
            hh = h8(markup)
            if hh not in by_hash:
                # ONE representative element per distinct markup. Multiplicity is
                # carried by the route sequence, not by duplicating the component.
                by_hash[hh] = {'kind': kind, 'els': [child], 'slots': slots,
                               'markup': markup, 'instances': 0}
            by_hash[hh]['instances'] += 1
            seq.append((kind, hh))
        route_seq[path] = seq
        if url_notes:
            manifest.setdefault('absolutised', {})[path] = url_notes
        route_meta[path] = {
            'title': (soup.title.string or '').strip() if soup.title else '',
            'description': next((m.get('content') for m in soup.head.find_all('meta')
                                 if m.get('name') == 'description'), ''),
            'html_class': ' '.join(soup.html.get('class') or []),
            'html_style': soup.html.get('style') or '',
            'stylesheets': sorted(set(re.findall(r'href="(css/[^"]+)"', html))),
        }

    # --- stable names: by (kind, first route order) ------------------------
    counters = {}
    name_of = {}
    for path, _ in ROUTES:
        for kind, hh in route_seq[path]:
            if hh in name_of:
                continue
            n = counters.get(kind, 0)
            counters[kind] = n + 1
            name_of[hh] = '%s_%d' % (kind, n)

    for hh, info in sorted(by_hash.items(), key=lambda kv: name_of[kv[0]]):
        name = name_of[hh]
        slots = info['slots'] if info['kind'] == 'main' else ()
        src = gen_component(name, info['els'], slots)
        src, inotes = apply_interaction(name, info['kind'], src)
        if inotes:
            interaction_notes[name] = inotes
        (parts_dir / ('%s.tsx' % name)).write_text(src)
        manifest['parts'][name] = {
            'kind': info['kind'], 'hash': hh, 'bytes': len(src),
            'slots': list(slots), 'instances': info['instances'],
        }

    # --- route table -------------------------------------------------------
    lines = ['// GENERATED by tools/gen_app.py — do not edit by hand.', '']
    for hh, name in sorted(name_of.items(), key=lambda kv: kv[1]):
        lines.append("import { %s } from './parts/%s';" % (name, name))
    lines.append('')
    lines.append('export type RouteEntry = {')
    lines.append('  path: string; title: string; description: string;')
    lines.append('  body: { kind: string; component: React.ComponentType<any> }[];')
    lines.append('  needsMarketList: boolean;')
    lines.append('};')
    lines.append('')
    lines.append('export const ROUTES: RouteEntry[] = [')
    for path, _ in ROUTES:
        meta = route_meta[path]
        seq = ', '.join('{ kind: %s, component: %s }' % (repr(k), name_of[h])
                        for k, h in route_seq[path])
        lines.append('  {')
        lines.append('    path: %s,' % json.dumps(path))
        lines.append('    title: %s,' % json.dumps(meta['title']))
        lines.append('    description: %s,' % json.dumps(meta['description']))
        lines.append('    body: [%s],' % seq)
        lines.append('    needsMarketList: %s,' % ('true' if manifest['slots'][path]
                                                   else 'false'))
        lines.append('  },')
    lines.append('];')
    lines.append('')
    lines.append('export const HTML_ATTRS = {')
    lines.append('  className: %s,' % json.dumps(route_meta['/']['html_class']))
    lines.append('  style: %s,' % json.dumps(route_meta['/']['html_style']))
    lines.append('};')
    lines.append('')
    (GEN / 'routes.tsx').write_text('\n'.join(lines))

    # --- manifest + assertions --------------------------------------------
    manifest['routes'] = {p: {'title': route_meta[p]['title'],
                              'body': [k for k, _ in route_seq[p]],
                              'stylesheets': route_meta[p]['stylesheets']}
                          for p, _ in ROUTES}
    (HERE / 'build').mkdir(exist_ok=True)
    # manifest is written at the END of main(), after the interaction and
    # URL-rewrite records exist

    dup = [n for n, i in manifest['parts'].items() if len(by_hash[i['hash']]['els']) != 1]
    print('parts written: %d (representatives: 1 each: %s)'
          % (len(name_of), 'yes' if not dup else 'NO -> %s' % dup))
    for hh, name in sorted(name_of.items(), key=lambda kv: kv[1]):
        i = manifest['parts'][name]
        print('  %-14s %-7s %5d bytes  instances=%d slots=%s'
              % (name, i['kind'], i['bytes'], i['instances'], i['slots'] or '-'))
    print('routes:')
    for p, _ in ROUTES:
        print('  %-14s chrome=%s slots=%s' % (p, [k for k, _ in route_seq[p]][:3],
                                              manifest['slots'][p] or '-'))
    # assertions
    ok = True
    for p, _ in ROUTES:
        want = EXPECT_SLOTS.get(p, [])
        got = manifest['slots'][p]
        if got != want:
            print('ASSERT FAIL %s: slots %s, expected %s' % (p, got, want))
            ok = False
    print('interaction wiring:')
    for nm, nts in sorted(interaction_notes.items()):
        print('  %-14s %s' % (nm, ', '.join('%s=%d' % t for t in nts)))
    manifest['interactions'] = interaction_notes
    # the market-list mains must wire 3 tab chips and 1 search box
    for nm, i in manifest['parts'].items():
        if i['kind'] != 'main' or 'marketList' not in i['slots']:
            continue
        got = dict(interaction_notes.get(nm, []))
        if got.get('chips') != 3 or got.get('search') != 1:
            print('ASSERT FAIL %s: chips=%s search=%s (want 3 / 1)'
                  % (nm, got.get('chips'), got.get('search')))
            ok = False
    # every header must wire both controls; every menu must have an open state
    for nm, i in manifest['parts'].items():
        if i['kind'] == 'header':
            got = dict(interaction_notes.get(nm, []))
            if got.get('theme-toggle') != 1 or got.get('menu-toggle') != 1:
                print('ASSERT FAIL %s: controls not wired %s' % (nm, got))
                ok = False
        if i['kind'] == 'menu' and dict(interaction_notes.get(nm, [])).get('menu-style', 0) < 2:
            print('ASSERT FAIL %s: menu open state missing' % nm)
            ok = False
    print('root-absolute asset urls:')
    for p, d in sorted(manifest.get('absolutised', {}).items()):
        print('  %-14s %s' % (p, d))
    print('slot assertions:', 'PASS' if ok else 'FAIL')
    (HERE / 'build' / 'gen_manifest.json').write_text(
        json.dumps(manifest, indent=1))
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main())
