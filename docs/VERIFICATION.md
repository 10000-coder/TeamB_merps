# Verification — measured, not self-reported

Every number below comes from a command in this repo. Nothing here is an
assessment; where a number is not measurable, it is listed as **not verified**
rather than estimated.

## Delivery

| | |
|---|---|
| Repo | <https://github.com/10000-coder/TeamB_merps> (`main`) |
| Production | <https://teamb-merps.vercel.app> |
| Deployed commit | `615d27031e31b91452e1ef15a1fd4f9fa203f973` (the motion build) |
| Deployment | `dpl_8S3XafxRyfRZEFarWpPsCmrx2xqx` (target: production, root `app`) |
| Vercel project | `teamb-merps` / `prj_bIFdpmhvPsb64cyNtpMcA8LP7Q1u` |

Live check, run against the deployed URL:

```
== routes ==
  /                200
  /trade           200
  /trade/options   200
  /portfolio       200
  /list-token      200
== assets (live vs locally verified dist) ==
  identical: 23/23   mismatches: 0
  index-JOTZnwNw.js 463924 bytes, live_match=True
```

The served JavaScript is byte-identical to the bundle measured below, so the numbers
in this document describe what is actually running.

> Re-measured after the motion pass (2026-09-26): production serves
> `assets/index-JOTZnwNw.js`, **463 924 bytes**, byte-identical to the locally verified
> build, and all 5 routes return 200. An earlier deployment pinned `5d362c1`
> (`dpl_6k8do8YjEAD3CCyoHGu6PkMwjY9B`) is superseded. See `docs/MOTION.md` for the
> parity figures that changed when motion was switched on.

## Reproduce

```bash
git clone https://github.com/10000-coder/TeamB_merps    # brings reference/
cd TeamB_merps
python3 tools/audit_assets.py                            # expect: TOTAL MISSING 0
python3 tools/build_offline.py --ref reference --out reference/site
bash tools/shoot_baselines.sh                            # baselines
python3 tools/gen_markets.py && python3 tools/gen_app.py
python3 tools/copy_public.py
cd app && npm install && npm run build && cd ..

python3 tools/replkit/sweep.py --config replkit.json --mode geom  --all
python3 tools/replkit/sweep.py --config replkit.json --mode pixel /:1440 /:375
python3 tools/replkit/sweep.py --config replkit.json --mode text  /:1440
python3 tools/verify_settled.py                          # structure tier
```

Reproducibility was checked the hard way: the repository was cloned into a **clean
sandbox**, only the hand-written sources were overlaid, and the committed pipeline was
run from scratch. The resulting tree was byte-identical to the locally verified one
across **all 128 non-lockfile paths**, and the produced bundle hash matched
(`assets/index-fWyyhYVU.js`).

## Tier 1 — pixel (strict) — *measured before the motion pass; superseded below*

Element geometry, computed styles, and full-page pixels against the offline copy of
the captured DOM. `dpr=1`, animations frozen.

| Route | Viewport | Theme | Elements | tag | class | rect <=0.75px | styles | docHeight | pixels identical |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 1440 | light | 1403 | 100% | 100% | **100.00%** | **100.00%** | 9381 = 9381 | **100.000%** (0 px) |
| `/` | 1440 | dark | 1403 | 100% | 100% | **100.00%** | **100.00%** | 9381 = 9381 | **100.000%** (0 px) |
| `/` | 375 | light | 1403 | 100% | 100% | **100.00%** | **100.00%** | 10207 = 10207 | **100.000%** (0 px) |
| `/` | 375 | dark | 1403 | 100% | 100% | **100.00%** | **100.00%** | 10207 = 10207 | **100.000%** (0 px) |
| `/portfolio` | 1440 | light | 223 | 100% | 100% | **100.00%** | **100.00%** | 1801 = 1801 | **100.000%** (0 px) |
| `/portfolio` | 1440 | dark | 223 | 100% | 100% | **100.00%** | **100.00%** | 1801 = 1801 | **100.000%** (0 px) |
| `/portfolio` | 375 | light | 223 | 100% | 100% | **100.00%** | **100.00%** | 2137 = 2137 | **100.000%** (0 px) |
| `/list-token` | 1440 | light | 235 | 100% | 100% | **100.00%** | **100.00%** | 1801 = 1801 | **100.000%** (0 px) |
| `/list-token` | 1440 | dark | 235 | 100% | 100% | **100.00%** | **100.00%** | 1801 = 1801 | **100.000%** (0 px) |
| `/list-token` | 375 | light | 235 | 100% | 100% | **100.00%** | **100.00%** | 2137 = 2137 | **100.000%** (0 px) |

### Tier 1 refreshed AFTER the motion pass (the shipped build)

The rows above were measured on a build with **no motion**. Turning motion on cannot
keep them: the frozen reference copy has no JavaScript, so it is a *pre-hydration*
render, while the port hydrates. Three effects the reference's own code applies on
mount therefore can no longer match it - see `docs/MOTION.md` section 4.

| Route | Viewport | Theme | differing px | identical | where the difference is |
|---|---|---|---|---|---|
| `/` | 1440 | light | 120 508 | 98.608% | 119 009 px = `#clients` active-stage panel (rows 6021-6860); ~1 480 px = rotating header brand mark; **0 px elsewhere** |
| `/` | 375 | light | 39 429 | 98.739% | same two causes |
| `/` | 1440 | dark | 120 531 | 98.634% | same |
| `/` | 375 | dark | 39 453 | 98.262% | same |
| `/portfolio` | 1440 | light | 296 | 99.959% | 148 px x 2 stitched bands = header brand mark only |
| `/list-token` | 1440 | light | 296 | 99.959% | identical count, same cause |

Geometry/style for `/` after the counter fix: **99.14%** rects within 0.75px and 98.00%
styles at 1440 (`99.57%` / `96.72%` at 375), docHeight still identical (9381 / 10207).
The 12 differing rects are exactly **4 hero-coin elements + 8 `#clients` caption
elements**; the style residue is those plus masks inside `display:none` responsive
variants, which can never intersect in the reference either. Mask/pixel numbers for the
other routes are unaffected except that the header brand mark now rotates everywhere
(hence 296 px on `/portfolio` and `/list-token`).

Motion is verified *behaviourally* instead: `tools/verify_motion.py` (22 checks) and
`tools/verify_counters.py` (6 checks). See `docs/MOTION.md`.

> One defect was found only after this pass, and is fixed: the stat counters animated
> `0 -> n` and then **snapped back to 0** (the port restored a snapshot taken after
> zeroing the column). The pixel baseline holds the correct digit, so no diff pointed at
> it. `tools/verify_counters.py` now guards exactly this. See `docs/MOTION.md` section 3.


The reference has one extra element on every route: a trailing framework
`<script>` with a 0x0 box. It is dropped by design (see `docs/PORT.md`).

### Intermediate widths (the layout is fluid, not stepped)

`--fluid-slope` interpolates between 375px and 1600px, so two breakpoints are not
enough. Sampled inside the range:

| Route | Width | rect <=0.75px | styles | docHeight |
|---|---|---|---|---|
| `/` | 768 | **100.00%** | 100.00% | 11125 = 11125 |
| `/` | 1024 | **100.00%** | 100.00% | 9910 = 9910 |
| `/` | 1280 | **100.00%** | 100.00% | 9435 = 9435 |
| `/portfolio` | 768 | **100.00%** | 100.00% | 2633 = 2633 |
| `/list-token` | 1024 | **100.00%** | 100.00% | 1801 = 1801 |

## Tier 2 — text (the tier that was missing last time)

The previous project's harness compared tag/class/box/style and **never text**;
254 text mismatches hid behind a green geometry report. Here text is compared
explicitly, scoped to `<body>` (framework-injected `<head>` nodes — chunk preloads,
meta ordering — are not page content and only shift indices).

| Route | Elements compared | text identical | whitespace-only | **text different** | attribute drift |
|---|---|---|---|---|---|
| `/` | 1402 | 1402 (**100.00%**) | 0 | **0** | 0 |
| `/portfolio` | 222 | 222 (**100.00%**) | 0 | **0** | 0 |
| `/list-token` | 234 | 234 (**100.00%**) | 0 | **0** | 0 |

## Tier 3 — structure (settled state, frozen numbers)

`/trade` and `/trade/options` **cannot** be pixel-diffed against the offline copy:
the offline copy is the pre-fetch SSR state (`Loading markets...`) while a real
browser settles to a populated list. Verified instead against the settled capture
from a cloud browser (`reference/settled/trade_market_list.html`), on shape and
cell text.

```
settled capture: 31 rows
candidate     : 31 rows
rows: 31/31 identical in tag, class, data-active and cell text
header row    : 'Market|Price|24h|Volume|Max'
chips         : 1m:false, 5m:false, 15m:true, 1h:false, 4h:false, 1d:false,
                Meme coins:true, Stocks:false, Listed:false
chart figure  : ['Desk balance=-', 'Chart=$0.780100']
gmgn embed    : chain/theme/interval all present
STRUCTURE TIER PASS
```

The GMGN frame the port renders is byte-for-byte the URL the live site produced:

```
https://www.gmgn.cc/kline/robinhood/0xc6911796042b15d7Fa4F6CDe69e245DdCd3d9c31?theme=light&interval=15
```

with `loading="lazy" referrerpolicy="no-referrer" allow="clipboard-write"` and
`title="VIRTUAL chart on GMGN"` — all copied from the reference's own JSX.

## Defects these checks caught (none were visible in a rendered screenshot)

| Defect | How it showed up | Fix |
|---|---|---|
| React mounted into a `#root` wrapper the reference does not have, putting every node one tree level deeper | geometry 44.87%, "worst drift 9380px", ref and candidate compared against the *wrong* elements | mount on `<body>` — geometry 100% |
| Whitespace-only text nodes were collapsed away, so the header rendered `Markets...` where the reference renders `Markets ...` (the space sat next to an SSR comment, `Markets<!-- --> `) | a span measured 5px narrow while computed styles still matched 100% | emit text nodes verbatim |
| The offline copy's root-relative `url(logo.png)` 404'd on every non-root route | the masked MERPS logo painted as a **solid block** on `/portfolio` etc.; 7 922 differing pixels | rewrite asset urls root-absolute in the generator |
| The pipeline assumed an output directory (`build/`, `app/src/data/`) that a fresh clone does not have | worked locally, failed in the clean rebuild | each script creates its own output dir |
| `site_build_report.json` was tracked and embeds absolute host paths | two builds on two machines produced different tree hashes for identical content | untracked + ignored (it is derived) |

## What is NOT verified (declared, so a green table is not misread)

| Surface | Why |
|---|---|
| Live prices | Numbers are the frozen capture. There is no `?live=1` opt-in in this build — see `docs/SCOPE.md`. |
| GMGN chart contents | The frame's URL and attributes are verified; the chart itself is a third-party document. |
| Trading, deposit, withdraw, options settlement | Require a signed transaction and the project's treasury backend. The original's own gated copy is reproduced. |
| Wallet session / desk balance | Server-side state; stays `Connect wallet` / `-`, exactly as the reference renders with no wallet. |
| Stocks and Listed tabs | No captured data for those tabs. They render the reference's **own** empty copy (`No market matches that search.` / `Nobody has listed a pair yet.`) rather than invented rows. |
| Mobile menu OPEN state | The capture only ever holds the menu closed. The open state is derived from the closed markup (see `docs/PORT.md`), not captured, so it is not verified against the reference. |
| `/privacy`, `/terms` | 404 upstream. |
