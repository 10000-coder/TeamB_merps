# Scope & state policy — what is replicated, frozen, or left empty

Standing user priority: **visual replication first**. So the rule below is ordered by
fidelity, not by "how live does it feel":

> Reproduce the **settled** state of every route. Wire a real upstream only where it is
> keyless **and** cannot perturb the frozen baseline. Never invent data.

## Per-route state policy

"SSR state" = what my frozen capture shows. "Settled state" = what a real browser shows
after the page's fetches resolve. Both were captured; they differ, and the difference
decides the work.

| Route | Settled state (from cloud browser) | Differs from my capture? | Data policy | Verification |
|---|---|---|---|---|
| `/` | static, 6 page-builder sections | **no** | none needed | pixel-diff vs offline copy |
| `/trade` | market list **populated** — 31 rows | **yes** (capture froze "Loading markets") | baked `markets_snapshot.json` | structure vs capture; numbers frozen |
| `/trade/options` | market list populated **+ strike ladder** (strikes/premiums) + `Connect a wallet first` | **yes** | baked snapshots | structure vs capture |
| `/portfolio` | `Your desk, start to finish`; **no data rows**; wallet-gated | **no** | none | pixel-diff vs offline copy |
| `/list-token` | `Open a market on anything`; static form, **no data rows** | **no** | none | pixel-diff vs offline copy |
| nav + footer stats | `Markets … · Listed …` — **the `...` never resolves, even on the live site** | **no** | none — reproduce the literal `...` | pixel-diff |
| wallet surfaces (deposit/withdraw/positions/trade buttons) | gated behind `Connect wallet` | **no** | keep gated | pixel-diff |

The last two rows are the useful discovery: **a large part of the site's "missing data"
is missing on the live site too.** Those `...` placeholders are hardcoded text in the
markup, not loading states — they are still present after 6 s of settling. Reproducing
them literally is both easier and more faithful than filling them in.

## Data policy detail

**1. Frozen snapshot by default.**
`reference/settled/markets_snapshot.json` carries, per market: the **captured display
strings** (exactly what the live page painted) *and* the upstream numbers with addresses.
The display strings are what the replica renders, so its settled market panel is
byte-comparable to the capture. No key, no backend, no drift.

**2. GMGN chart = wired live.**
`https://www.gmgn.cc/kline/{chain}/{address}?theme={theme}&interval={interval}`,
`chain = address.startsWith("0x") ? "robinhood" : "sol"`, default `interval=15`.
Observed live, after clicking VIRTUAL:

```
https://www.gmgn.cc/kline/robinhood/0xc6911796042b15d7Fa4F6CDe69e245DdCd3d9c31?theme=light&interval=15
```

This is the one surface where "接 GMGN" is real and free — and because it only appears
**after** a market is selected, it cannot perturb the baseline. `loading="lazy"` and
`referrerPolicy="no-referrer"` copied from the original, along with the original's
explanatory copy for when the frame comes up blank.

**3. Opt-in live refresh.**
`?live=1` (or an env flag) switches the market list to fetch DexScreener directly at
runtime. **Off by default**, so it can never silently break a pixel comparison.

**4. Reproduce the original's own empty states — never fabricate.**
Wallet-gated controls keep their wording and stay disabled. Empty tables stay empty.
`/api/pairs` is **500 upstream**, so the custom-pairs surface shows the original's own
error copy rather than invented rows.

## What is explicitly NOT replicated

| Surface | Why | What the replica shows |
|---|---|---|
| Trading (open/close position, deposit, withdraw) | needs a signed tx + their treasury backend | original wording, disabled |
| Options settlement | needs backend + wallet | original wording |
| Custom pairs (`/api/pairs`, `/pairs/create`, `/pairs/launch`) | **500 upstream right now** | original error/empty copy |
| Tokenised-stock prices (AAPL, AMD, AMZN, BABA, COIN, CRCL) | Chainlink-fed, not on DexScreener; `volume 0 / liquidity 0` | price snapshot, no activity columns |
| Wallet session / user balance | server-side state | `Connect wallet` |

## Verification model

Three tiers, because not everything is equally checkable — and saying which is which is
the whole point:

1. **Pixel tier (strict).** `/`, `/portfolio`, `/list-token`, all chrome, both themes,
   1440 + 375 + intermediate widths (the layout is fluid, `--fluid-slope`). Measured
   against the offline copy with `replkit/sweep.py` + `pixel_diff.py`.
2. **Structure tier (strict on shape, frozen on numbers).** The settled market panel and
   options ladder: compared to the cloud-browser capture on **tag / class / box
   geometry**, not text. The class contract is small and known:
   `desk-scroll`, `desk-hit`, `flex flex-col gap-4`, `text-caption-20 opacity-50`,
   `font-mono text-caption-20 tabular-nums`, `… desk-up`, `… desk-down`,
   `… opacity-50`, `font-mono text-caption-10 uppercase opacity-50`.
   Numbers are frozen data and are **declared** as such, not silently compared.
3. **Not verified (declared).** Live upstream values, wallet flows, anything requiring
   their backend. Listed here so no one reads a green pixel diff as more than it is.

## Formatting contract (derived, then checked — not guessed)

Extracted from the capture and cross-checked against the public API payload at a
different instant; CASHCAT and HOOD matched to the character, the rest matched in shape
with seconds-level drift:

| Column | Rule | Example |
|---|---|---|
| PRICE | `$` + 6 dp if `<1` else 2 dp → `usd(priceUsd, priceUsd>=1?2:6)` | `$0.780100` |
| 24H | signed 2 dp; **`"-"` when the change is falsy**; class `desk-up` if `>=0` else `desk-down` | `+5.19%`, `-52.35%`, `-` |
| VOLUME | whole dollars with thousands separators | `$1,811,836` |
| MAX | `<maxLeverage>x`, CSS `uppercase` | `5x` → renders `5X` |
| headers | `MARKET PRICE 24H VOLUME MAX` | — |
| row sort | payload order (already volume-desc) | — |

The `"-"` case is a concrete example of why this was worth deriving: a `change24h` of
exactly `0` renders as a bare `-` **with the `desk-up` class**, which no one would guess
by looking at a screenshot.
