import { useMemo } from 'react';
import { MARKETS, type Market } from '../data/markets';
import { useDesk } from './DeskContext';
import { ui } from './tokens';

/**
 * The settled market list.
 *
 * Structure and copy are taken from the reference's own bundle
 * (`410-6j5gz8rd4.js`): the `desk-hit-head` header row, the "no match" copy, and
 * the `desk-scroll` row list. The CELLS render the frozen display strings from
 * `reference/settled/markets_snapshot.json` -- see docs/SCOPE.md for why the
 * numbers are frozen rather than recomputed.
 */
function Row({ market, active, onSelect }: {
  market: Market;
  active: boolean;
  onSelect: (m: Market) => void;
}) {
  return (
    <button
      type="button"
      className="desk-hit"
      data-active={active}
      onClick={() => onSelect(market)}
    >
      <span className="flex flex-col gap-4">
        <span>{market.symbol}</span>
        <span className={ui.dim}>{market.name}</span>
      </span>
      <span className={ui.mono}>{market.price}</span>
      <span className={`${ui.mono} ${market.changeDir}`}>{market.change}</span>
      <span className={`${ui.mono} opacity-50`}>{market.volume}</span>
      <span className={ui.label}>{market.leverage}</span>
    </button>
  );
}

export function MarketList() {
  const { selectedSymbol, select, tab, query } = useDesk();

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MARKETS
      .filter((m) => m.marketType === tab)
      .filter((m) => !q
        || m.symbol.toLowerCase().includes(q)
        || m.name.toLowerCase().includes(q));
  }, [tab, query]);

  if (rows.length === 0) {
    // The reference's own empty copy, verbatim.
    return (
      <p className={ui.dim}>
        {tab === 'custom'
          ? 'Nobody has listed a pair yet. List a token and it trades here.'
          : 'No market matches that search.'}
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      <div className={`${ui.hit} desk-hit-head`}>
        <span>Market</span>
        <span>Price</span>
        <span>24h</span>
        <span>{tab === 'custom' ? 'Pool' : 'Volume'}</span>
        <span>Max</span>
      </div>
      <div className="desk-scroll">
        {rows.map((m, i) => (
          <Row
            key={`${m.marketType}-${m.address ?? m.symbol}-${i}`}
            market={m}
            active={selectedSymbol === m.symbol}
            onSelect={(mm) => select(mm.symbol)}
          />
        ))}
      </div>
    </div>
  );
}
