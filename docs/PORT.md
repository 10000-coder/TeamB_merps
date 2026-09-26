# How the port is built

The rule from the previous project's retrospective: **the port is mechanical, and
the only hand-written code is the part that needs data.** Hand-transcribing ~1,400
elements per route cannot be verified; generating them from the captured DOM can.

```
reference/site/*.html          captured, offline-renderable DOM
        │
        │  tools/gen_app.py  (mechanical: DOM -> TSX via replkit/html_to_jsx.py)
        ▼
app/src/gen/parts/*.tsx        one component per distinct piece of markup
app/src/gen/routes.tsx         per-route body sequence + title/description
        │
        │  hand-written (the data-driven regions only)
        ▼
app/src/desk/*.tsx             market list, chart panel, chart figure, intervals
app/src/lib/*                  sx(), theme, router, menu store
app/index.html                 the reference's head, verbatim
app/public/                    the site's own css / fonts / images, verbatim
```

## Why generated, not hand-written

* **Inline styles are carried through verbatim.** The reference inlines
  theme-dependent colours — light and dark are two separate colour sets, not CSS
  variables — so re-authoring them by hand would drift silently. `sx()` parses the
  captured style string into the object React wants, preserving order and custom
  properties (`--sbw`).
* **Chrome is deduplicated by content hash, not by assumption.** The header and the
  mobile menu genuinely differ per route: the contextual CTA is `Start trading` →
  `/trade` on the home page and `Trade options` → `/trade/options` inside the app.
  Three header variants and three menu variants came out of hashing; assuming one
  shared header would have been wrong.
* **Text nodes are emitted verbatim.** Collapsing whitespace and dropping
  whitespace-only nodes produced `Markets...` where the reference renders
  `Markets ...` — the space lived next to an SSR comment (`Markets<!-- --> `).
  The computed styles still matched 100% while a span's width was 5px out.

## Slots: the seam between mechanical markup and real data

The captured DOM holds "nothing selected yet" placeholders. `gen_app.py` replaces
each with a named `<x-slot>`, and the app fills them. The counts are asserted, so a
missing or duplicated substitution cannot pass silently.

| Route | Slots | Replaces |
|---|---|---|
| `/trade` | `marketList`, `chart`, `chartFigure`, `chartIntervals` | `Loading markets...`, `div.desk-chart-empty`, the Chart panel's `span.desk-figure`, and (appended) the interval selector |
| `/trade/options` | `marketList` | `Loading markets...` |

The interval selector is **appended**, not replaced: the reference renders it only
once a chart exists, so the SSR capture has no element to swap.

## Interactive wiring

Also generated, from the reference's own markup — no extra DOM attributes, so the
tree stays byte-comparable:

| Control | Identified by | Wired to |
|---|---|---|
| theme toggle | `aria-label="Toggle theme"` | `toggleTheme()` → `html[data-theme]` + `merps-theme` |
| menu button | the `aria-expanded` toggle | `toggleMenu()` |
| tab chips | label text (`Meme coins`/`Stocks`/`Listed`) | `setTab(...)` + `data-active` |
| search box | `className` contains `desk-search` | controlled `value`/`onChange` filtering the frozen rows |

**The menu's open state is derived, not captured.** The capture only holds the menu
closed, and the closed markup *is* the start of an entrance transition
(`opacity:0`, `transform:translateY(...)`, `visibility:hidden`). The open state is
that same declaration with the entrance finished, transition timings — including
the per-link stagger delays — left exactly as captured. It is therefore **not
verified** against the reference (see `docs/VERIFICATION.md`).

## Deliberate differences from the reference

| Difference | Reason |
|---|---|
| Framework `<script>` tags dropped | The prerendered DOM is already complete; hydration is being replaced, not measured. One 0×0 element per route. |
| No `#root` wrapper — React mounts on `<body>` | The reference's `<body>` holds header/menu/main/footer directly. A wrapper inserts a tree level the reference does not have, which puts every node at a different position and makes structural comparison compare the wrong elements. |
| Root-relative asset URLs made root-absolute | The offline copy makes `url(logo.png)` relative so it can be served from any root. The app cannot: its pages live at `/`, `/portfolio/`, `/trade/options/`, so a relative path 404'd everywhere but the home page and silently turned the masked MERPS logo into a solid block. |
| Both stylesheets loaded on every route | `0rawm0zjs07vl.css` contains only `.desk-*` selectors, so it cannot affect the marketing pages. Verified by 100.000% pixel parity. |

## Determinism

`gen_app.py` and `gen_markets.py` contain no timestamps and name files by content
hash order. `tools/verify_tree.sh` checks the committed tree against the working
tree. Baselines are regenerable byte-identically (`reference/baselines.json` pins
their sha256); captures are deterministic — repeated runs are md5-identical.
