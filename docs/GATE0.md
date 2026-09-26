# Gate 0 — merps.co reference package

**Status: CLEARED** (2026-09-26). Implementation may start.

Gate 0 is the one rule that the previous replication project skipped, at a cost of
two full rewrite cycles: **do not write implementation code until the reference is
offline-remeasurable.** Measurability means someone other than the author can
re-run the baseline.

Source: <https://www.merps.co/>

## What was captured

| Item | Detail |
|---|---|
| Routes | `/`, `/trade`, `/trade/options`, `/portfolio`, `/list-token` (`/privacy`, `/terms` are 404 upstream) |
| Stack | Next.js App Router + Turbopack, prerendered on Vercel; Tailwind v4 |
| DOM | fully prerendered — no `__NEXT_DATA__`; data rides in the RSC flight payload |
| Home page | 6 page-builder sections: `bannerSection`, `heroSection`, `statsSection`, `insightsSection`, `clientsSection`, `testimonialSection` |
| Imagery | **no raster images at all** — the logo is an inline `mask-image`, everything else is inline `<svg>` |
| Fonts | Suisse Intl (400 / 450 / 600 + italics) + Suisse Intl Mono, 7 files |
| Theme | `html[data-theme]`, localStorage key `merps-theme` |
| Scroll | `lenis` smooth scroll |
| Layout | **fluid**, not stepped: `--fluid-slope` interpolates between 375px and 1600px, so parity must hold at intermediate widths, not just 1440/375 |

## Baseline defect found and fixed (this is the point of the gate)

The first Gate 0 pass reported **"[ok] offline assets resolve — 6/6 on disk"** and
concluded *"None found… every asset the DOM and the manifest reference is present."*
**That was wrong.**

`/logo.png` is referenced **8–12× per route** from an inline
`style="mask-image:url(/logo.png)"`. It is served from the site's document root, so it
appears in no manifest entry and in no `<img>`/`<link>` tag. The offline copy is served
from `reference/site/`, where it did not exist → the mask failed → and the frozen
baseline itself had a broken hero:

| Region | Broken baseline | Fixed baseline |
|---|---|---|
| header brand mark, 34×22 | **1 distinct colour** — a solid `rgb(35,35,35)` block | 104 colours, the real glyph |
| hero watermark, 249×319 | **1 distinct colour** — nothing painted | 9 colours, the real glyph |

The consequence is the dangerous kind: a replica built against that baseline would
have faithfully reproduced **a solid black rectangle instead of the MERPS logo**, and
the pixel diff would have reported **100% agreement**, because the replica inherited
the same broken mask. A self-consistent baseline proves nothing about the target.

How it was caught: `tools/audit_assets.py` scans inline `style` / CSS `url()` refs, not
just `<img src>`. Two gate blind spots were then closed so this class cannot pass again
(`tools/replkit/gate0.py`):

1. the offline-asset scan only matched `src|href|srcset|poster` attributes — it now also
   scans `url(...)` (a failed mask is an asset failure, not a style choice);
2. `resolve()` returned `None` for a *bare filename*, so `url(logo.png)` was silently
   skipped rather than reported missing; bare names are now resolved against the
   document root.

Evidence image: `docs/evidence/logo_defect_evidence.png`.
Captures are deterministic — two runs of the same page are md5-identical — so the
old-vs-new baseline difference is real, not capture noise.

## Gate results (after the fix)

```
[ ok ] reference package exists  reference
[ ok ] hydrated DOM captured     site/index.html (212.1 KB)
[ ok ] offline copy renders      elements=1432 docHeight=9381 docWidth=1440
[ ok ] offline assets resolve    7/7 on disk
[ ok ] internal routes captured  all 5 internal link target(s) covered
[ ok ] DATA assets resolve       12/12 on disk
[ ok ] asset manifest verified   manifest.json: 34 entries verified, 0 without hash
[ ok ] declared baselines        4 baseline(s), e.g. (1440, 9381)
[warn] structured data parses    no data layer — content is inline in the DOM (confirmed)
[warn] route inventory explicit  no routes/ dir — captures are flat files (handled)
```

Raw: `reference/gate0_report.json`.

## Reproducing

```bash
git clone https://github.com/10000-coder/TeamB_merps     # brings reference/
cd TeamB_merps

# 0. audit every asset reference (inline styles and CSS url() included)
python3 tools/audit_assets.py                 # must print TOTAL MISSING: 0

# 1. rebuild the offline-renderable copy (deterministic)
python3 tools/build_offline.py --ref reference --out reference/site

# 2. rebuild the baselines
bash tools/shoot_baselines.sh

# 3. re-run the gate
python3 tools/replkit/gate0.py --ref reference --offline-dir site \
    --public-root reference/site --width 1440
```

## Committed vs. regenerable

Committed: the raw captures, the archived assets, the build report, the tooling, the
baseline manifest.
**Not** committed (regenerable in one command, and committing them would bloat the
repo with derived bytes): `reference/site/`, `reference/screenshots/`, `build/`. The
screenshots' identities are pinned in `reference/baselines.json` so a regenerated
baseline can be checked against the one used for verification.

## Known upstream gaps

**None remaining.** The one real gap (`/logo.png`) is fixed above. All 34 manifest
assets verify by sha256, and every asset reference across all 5 routes — attribute,
inline-style and CSS — now resolves on disk.
