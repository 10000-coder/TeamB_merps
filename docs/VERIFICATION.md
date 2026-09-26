# Verification — measured, not self-reported

Every number below comes from a command in this repo. Nothing here is an
assessment; where a number is not measurable, it is listed as **not verified**
rather than estimated.

Reproduce:

```bash
cd TeamB_merps
python3 tools/audit_assets.py                              # assets: expect 0 missing
python3 tools/build_offline.py --ref reference --out reference/site
bash tools/shoot_baselines.sh                              # baselines
python3 tools/gen_markets.py && python3 tools/gen_app.py   # codegen
python3 tools/copy_public.py                               # site css/fonts/img
cd app && npm install && npm run build && cd ..

python3 tools/replkit/sweep.py --config replkit.json --mode geom  --all
python3 tools/replkit/sweep.py --config replkit.json --mode pixel /:1440 /:375
python3 tools/replkit/sweep.py --config replkit.json --mode text  /:1440
python3 tools/verify_settled.py                            # structure tier
```

## Tier 1 — pixel (strict)

Element geometry, computed styles, and full-page pixels against the offline copy of
the captured DOM. `dpr=1`, animations frozen.

| Route | Viewport | Theme | Elements | tag | class | rect ≤0.75px | styles | docHeight | pixels identical |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 1440 | light | 1403 | 100% | 100% | **100.00%** | **100.00%** | 9381 = 9381 | **100.000%** (0 px) |
| `/` | 1440 | dark | 1403 | 100% | 100% | **100.00%** | **100.00%** | 9381 = 9381 | **100.000%** (0 px) |
| `/` | 375 | light | 1403 | 100% | 100% | **100.00%** | **100.00%** | 10207 = 10207 | **100.000%** (0 px) |
| `/` | 375 | dark | 1403 | 100% | 100% | **100.00%** | **100.00%** | 10207 = 10207 | **100.000%** (0 px) |
| `/portfolio` | 1440 | light/dark | 223 | 100% | 100% | **100.00%** | **100.00%** | 1801 = 1801 | **100.000%** (0 px) |
| `/portfolio` | 375 | light | 223 | 100% | 100% | **100.00%** | **100.00%** | 2137 = 2137 | **100.000%** (0 px) |
| `/list-token` | 1440 | light/dark | 235 | 100% | 100% | **100.00%** | **100.00%** | 1801 = 1801 | **100.000%** (0 px) |
| `/list-token` | 375 | light | 235 | 100% | 100% | **100.00%** | **100.00%** | 2137 = 2137 | **100.000%** (0 px) |

The reference has one extra element on every route: a trailing framework
`<script>` with a 0×0 box. It is dropped by design (see `docs/PORT.md`).

### Intermediate widths (the layout is fluid, not stepped)

`--fluid-slope` interpolates between 375px and 1600px, so two breakpoints are not
enough. Sampled inside the range:

| Route | Width | rect ≤0.75px | styles | docHeight |
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

## What is NOT verified (declared, so a green table is not misread)

| Surface | Why |
|---|---|
| Live prices | Numbers are the frozen capture. There is no `?live=1` opt-in in this build — see `docs/SCOPE.md`. |
| GMGN chart contents | The frame's URL/attributes are verified; the chart itself is a third-party document. |
| Trading, deposit, withdraw, options settlement | Require a signed transaction and the project's treasury backend. The original's own gated copy is reproduced. |
| Wallet session / desk balance | Server-side state; stays `Connect wallet` / `-`, exactly as the reference renders with no wallet. |
| Stocks and Listed tabs | No captured data for those tabs. They render the reference's **own** empty copy (`No market matches that search.` / `Nobody has listed a pair yet.`) rather than invented rows. |
| Mobile menu OPEN state | The capture only ever holds the menu closed. The open state is derived from the closed markup (see `docs/PORT.md`), not captured, so it is not verified against the reference. |
| `/privacy`, `/terms` | 404 upstream. |
