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
| Imagery | **no raster images at all** — 65 inline `<svg>` on the home page |
| Fonts | Suisse Intl (400 / 450 / 600 + italics) + Suisse Intl Mono, 7 files |
| Theme | `html[data-theme]`, localStorage key `merps-theme` |
| Scroll | `lenis` smooth scroll |
| Layout | **fluid**, not stepped: `--fluid-slope` interpolates between 375px and 1600px, so parity must hold at intermediate widths, not just 1440/375 |

## Gate results

```
[ ok ] reference package exists  reference
[ ok ] hydrated DOM captured     site/index.html (212.2 KB)
[ ok ] offline copy renders      elements=1432 docHeight=9381 docWidth=1440
[ ok ] offline assets resolve    6/6 on disk
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

# 1. rebuild the offline-renderable copy (deterministic)
python3 tools/build_offline.py --ref reference --out reference/site

# 2. rebuild the baselines
bash tools/shoot_baselines.sh

# 3. re-run the gate
python3 tools/replkit/gate0.py --ref reference --offline-dir site \
    --public-root reference/site --width 1440
```

## Committed vs. regenerable

Committed: the raw captures, the archived assets, the build report, the tooling.
**Not** committed (regenerable in one command, and committing them would bloat the
repo with derived bytes): `reference/site/` and `reference/screenshots/`. Their
identities are pinned in `reference/baselines.json` so a regenerated baseline can
be checked against the one used for verification.

## Known upstream gaps

None found. Unlike the previous target, every asset the DOM and the manifest
reference is present — there are no 404-upstream placeholders to reproduce.
