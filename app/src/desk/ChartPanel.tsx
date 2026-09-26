import { MARKETS } from '../data/markets';
import { useDesk } from './DeskContext';
import { GMGN_CHAIN, GMGN_EMBED_HOST, GMGN_SOLANA_CHAIN, ui } from './tokens';

/**
 * The chart region, ported from the reference's own JSX.
 *
 * The reference embeds GMGN's chart and is explicit that it is not its own:
 *   * `chain = address.startsWith("0x") ? "robinhood" : "sol"` (its own constants)
 *   * `embed = ${GMGN_EMBED_HOST}/kline/${chain}/${address}?theme=${theme}&interval=${interval}`
 *   * stocks are excluded (`marketType === "stock"` -> no chart)
 *   * the frame is `loading="lazy" referrerPolicy="no-referrer" allow="clipboard-write"`
 *   * the note and the "Open on GMGN" link are the reference's own copy
 *
 * GMGN sends no X-Frame-Options and no CSP frame-ancestors, so the embed works.
 * This region only exists once a market is selected, so it cannot perturb the
 * frozen baseline of any other route.
 */
export function ChartPanel() {
  const { selectedSymbol, interval, theme } = useDesk();
  const market = MARKETS.find((m) => m.symbol === selectedSymbol);

  const embed = (() => {
    if (!market?.address || market.marketType === 'stock') return null;
    const chain = market.address.startsWith('0x') ? GMGN_CHAIN : GMGN_SOLANA_CHAIN;
    const page = `${GMGN_EMBED_HOST}/kline/${chain}/${market.address}`;
    return { embed: `${page}?theme=${theme}&interval=${interval}`, page };
  })();

  if (!embed) {
    return (
      <div className="desk-chart-empty">
        <span className={ui.dim}>
          {market
            ? 'Tokenised stocks are priced here from a Chainlink feed, which publishes a price rather than a chart.'
            : 'Pick a market to see its chart.'}
        </span>
      </div>
    );
  }

  return (
    <>
      <iframe
        className="desk-chart"
        src={embed.embed}
        title={`${market?.symbol ?? 'Market'} chart on GMGN`}
        loading="lazy"
        referrerPolicy="no-referrer"
        allow="clipboard-write"
        key={embed.embed}
      />
      <div className="flex flex-wrap items-center justify-between gap-12">
        <p className={ui.dim}>
          The chart is GMGN&apos;s. If it comes up blank or asks you to verify,
          GMGN does not carry this market yet.
        </p>
        <a className={ui.link} href={embed.page} target="_blank" rel="noreferrer">
          Open on GMGN
        </a>
      </div>
    </>
  );
}
