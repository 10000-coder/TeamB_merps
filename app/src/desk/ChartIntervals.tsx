import { MARKETS } from '../data/markets';
import { useDesk } from './DeskContext';
import { INTERVALS, ui } from './tokens';

/**
 * The chart's interval selector. The reference renders it only when a chart
 * exists (i.e. a non-stock market is selected), so the slot that hosts it sits
 * after the price block but renders nothing when there is no chart.
 */
export function ChartIntervals() {
  const { selectedSymbol, interval, setInterval: setIntervalValue } = useDesk();
  const market = MARKETS.find((m) => m.symbol === selectedSymbol);
  if (!market?.address || market.marketType === 'stock') return null;

  return (
    <div className="flex flex-wrap gap-8">
      {INTERVALS.map((i) => (
        <button
          key={i.value}
          type="button"
          className={ui.chip}
          data-active={interval === i.value}
          onClick={() => setIntervalValue(i.value)}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
}
