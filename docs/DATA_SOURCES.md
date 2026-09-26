# Data sources — what merps.co actually reads, and what we can wire

**Verdict up front:** the premise "their market data comes from GMGN" is **not what the
code shows**. GMGN appears in exactly one role: a **keyless iframe** for the kline chart.
The market data comes from **their own backend**, which aggregates **DexScreener**.
Both are reachable without credentials, so the honest split is:

| Surface | Real upstream | Reachable by us? | Decision |
|---|---|---|---|
| Kline chart | `gmgn.cc/kline/{chain}/{addr}` **iframe** | ✅ keyless, deterministic URL | **WIRE IT** |
| Market list + prices (31 memecoins) | merps `/api/markets` → **DexScreener** | ✅ keyless public API, 31/31 coverage | **WIRE (frozen snapshot)** |
| Tokenised stocks (6: AAPL…CRCL) | **Chainlink price feed** (their own copy says so) | ❌ not a public API | snapshot, no activity |
| Custom pairs (`/api/pairs`) | merps backend + DB | ❌ returns **500** upstream right now | empty state |
| Deposit / withdraw / positions / options / history / session / user | merps backend + DB + treasury signing | ❌ server-side state | mock / disconnected |
| `ethPrice` | merps backend | ✅ (derivable) | snapshot |

---

## 1. GMGN is an iframe, not a data source

Evidence — the only two GMGN constants in the whole bundle:

```
GMGN_CHAIN        "robinhood"
GMGN_EMBED_HOST   "https://www.gmgn.cc"
GMGN_SOLANA_CHAIN "sol"
```

and the only place they are used (identical in `410-6j5gz8rd4.js` and `43gcvzzh7l_pz.js`):

```js
let s = e.address.startsWith("0x") ? GMGN_CHAIN : GMGN_SOLANA_CHAIN,
    a = `${GMGN_EMBED_HOST}/kline/${s}/${e.address}`;
return { embed: `${a}?theme=${c}&interval=${i}`, page: a };
// ...rendered as:
<iframe className="desk-chart" src={h.embed} title={`${e?.symbol ?? "Market"} chart on GMGN`}
        loading="lazy" referrerPolicy="no-referrer" allow="clipboard-write" />
```

Their own copy next to it: *"This chart is GMGN's. If it comes up blank or asks you to
verify, GMGN does not carry this market yet."* — i.e. they treat it as a **best-effort
third-party embed**, which is why the frame is allowed to be blank.

Framing test (from the Composio sandbox, plain HTTP):

| URL | status | `X-Frame-Options` | CSP `frame-ancestors` |
|---|---|---|---|
| `https://www.gmgn.cc/kline/robinhood/0xc691…9c31` | 403 | **absent** | **absent** |
| same `?theme=dark&interval=15m` | 403 | **absent** | **absent** |

Reading: GMGN does **not** forbid framing (no `X-Frame-Options`, no `frame-ancestors`).
The 403 is a **Cloudflare bot challenge** on a non-browser request — in a real browser it
renders. So the embed is wireable exactly as the original does it, and we inherit the
original's failure mode (blank frame + their explanatory copy) rather than inventing one.

## 2. The market data is DexScreener, and it is public

`GET https://www.merps.co/api/markets` → **200, no auth** (11 KB):
`{ memecoins: [31], stocks: [6], ethPrice }`; memecoin fields
`symbol, name, address, priceUsd, priceEth, change24h, volume24h, liquidity, marketType, maxLeverage, imageUrl`.
`imageUrl` points at **`cdn.dexscreener.com`**.

Cross-check against DexScreener's keyless public endpoint
`https://api.dexscreener.com/latest/dex/tokens/{address}` (queried seconds later):

| field | merps `/api/markets` | DexScreener live |
|---|---|---|
| VIRTUAL `priceUsd` | 0.7787 | 0.7794 |
| VIRTUAL `volume24h` | 1,811,373.62 | 1,811,707.19 |
| VIRTUAL `liquidity` | 207,026.72 | 207,134.71 |
| chain / dex | — | `chainId: robinhood`, `dexId: uniswap` |

Same magnitudes, drifting by seconds → **same upstream, different moment.**
Coverage: **31/31** of merps' memecoin addresses resolve on DexScreener, so a rebuilt
market list can carry real values with **no key and no backend**.

Contrast: `/api/pairs` → **500** `{"pairs":[],"error":"The listed markets are not available right now."}`
— their own backend is partly down as of capture. We cannot depend on it even if we wanted to.

## 3. Frozen snapshot is the default, on purpose

The user's standing priority is *visual replication first*, and the previous project's
costliest mistake class was **a reference that could not be re-measured**. Live numbers
change every block, so a live-wired market list could never be pixel-compared to a
baseline. Therefore:

- **Default = frozen snapshot.** A build-time JSON (`public/data/markets.json`) baked from
  the captured `/api/markets` payload, same schema, same values. Deterministic → the
  rendered DOM settles to the *same* bytes every run → measurable against a reference
  captured the same way.
- **Live refresh = opt-in** (`?live=1` / env flag) hitting DexScreener directly. Off by
  default so it can never silently break a pixel comparison.
- The **GMGN chart stays live regardless** — it only appears after a user selects a
  market, so it cannot perturb the baseline, and it is the one surface where "接" is real
  and free.

## 4. What stays mock / empty (and says so in the UI)

No backend ⇒ these are unreproducible by construction. They render the **original's own
empty and disconnected states**, never fabricated numbers:

- `Connect wallet` / `Desk balance -` / `Deposit` / `Withdraw`
- positions & options tables (empty states)
- `/list-token` look-up flow — the *lookup* is `/api/token?address=` (server-side); we can
  keep the UI and let it report the same failure copy the original shows when lookup fails
- custom pairs (`/api/pairs` → 500 upstream) → the original's own error/empty copy

Where a control would need a signature or funds, it stays disabled with the original's
wording. **No invented numbers anywhere** — a mock that looks like data is exactly the
failure mode this project is trying to avoid.

## 5. Reproduce this evaluation

```bash
# constants + the only GMGN call site
grep -ohE '.{200}gmgn.{200}' reference/assets/next/*.js

# the app's whole API surface
grep -oihE '.{150}(fetch\(|/api/).{150}' reference/assets/next/*.js | grep -i 'api/'

# live probes (needs egress — the local box has none; use the Composio sandbox)
python3 tools/probe_data_sources.py
```

Live probe results, captured 2026-09-26:

| probe | result |
|---|---|
| `merps.co/api/markets` | 200, 11,347 B, `memecoins:31 stocks:6` |
| `merps.co/api/pairs` | 500 (backend down) |
| `merps.co/api/session` | 200 `{"wallet":null}` |
| `dexscreener.com/…/tokens/{addr}` (31 addrs) | 200, **31/31 covered** |
| `gmgn.cc/kline/robinhood/{addr}` | 403 Cloudflare, **no frame-blocking headers** |
| `rpc.mainnet.chain.robinhood.com` | 403 (not a public RPC) |

---

## 6. Update — the backend names its own source, and most read paths are public

Two facts captured after the first draft, both decisive.

**(a) The smoking gun.** `/api/price?address=…` returns an explicit `source` field:

```json
{"priceEth":0.0002899,"priceUsd":0.7799,"marketCap":6382258,"source":"dexscreener"}
```

merps' own server says where the numbers come from. It is **not GMGN**, it is
DexScreener — exactly as the field-for-field comparison in §2 predicted.

**(b) Read endpoints are public; write endpoints are not.**

| endpoint | status | note |
|---|---|---|
| `GET /api/markets` | **200** | 31 memecoins + 6 stocks + `ethPrice` |
| `GET /api/price?address=` | **200** | includes `source:"dexscreener"` |
| `GET /api/token?address=` | **200** | symbol / name / price |
| `GET /api/history?wallet=` | **200** | `{"trades":[]}` for a zero wallet |
| `GET /api/options/history?wallet=` | **200** | `{"contracts":[]}` |
| `GET /api/session` | **200** | `{"wallet":null}` |
| `GET /api/options/mark?id=` | 404 | needs a real contract id |
| `GET /api/pairs` | **500** | `"The listed markets are not available right now."` — backend down |
| `POST /api/pairs/create\|launch`, `/api/deposit`, `/api/withdraw`, `/api/position/*`, `/api/options/close` | not attempted | signing / funds / treasury |
| `rpc.mainnet.chain.robinhood.com` | 403 | not a public RPC |

So the read paths *could* be wired live. They are still **off by default** because live
numbers cannot be pixel-compared to a baseline — see §3. Opt-in, not default.

## 7. Settled-state capture (a frozen reference cannot be the SSR snapshot)

My first capture of the app routes recorded the **pre-fetch** state — `/trade` froze
"Loading markets", not what a visitor sees. That is the same class of error as the
previous project's invalid baseline, caught this time *before* writing any code, so the
routes were re-captured in a real browser after settling:

| route | settled state | = my capture? |
|---|---|---|
| `/trade` | market list **populated**, 31 rows | no — capture had "Loading markets" |
| `/trade/options` | market list populated **+ strike ladder** + `Connect a wallet first` | no |
| `/portfolio` | `Your desk, start to finish`, **no data rows** | **yes** |
| `/list-token` | `Open a market on anything`, static form | **yes** |
| nav + footer stats | `Markets … · Listed …` — the `...` **never resolves, on the live site either** | **yes** |

The captured settled markup is archived at `reference/settled/` (row markup, column
headers, the observed iframe src, and the joined market snapshot). The formatting contract
derived from it is in `docs/SCOPE.md`; it was cross-checked against the public payload at
a different instant, so the rules are *verified*, not eyeballed.
