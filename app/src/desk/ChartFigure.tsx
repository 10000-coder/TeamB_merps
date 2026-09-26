import { MARKETS } from '../data/markets';
import { useDesk } from './DeskContext';
import { ui } from './tokens';

/**
 * The chart panel's heading. Ported from the reference's own JSX:
 *   label  = market ? `${market.symbol} price` : "Chart"
 *   figure = live price, else "-"     -> frozen snapshot price here
 *   change = shown only when the market has a change
 *
 * The reference polls `/api/price` every 20s for the live figure; with no backend
 * this uses the market's own captured USD price, formatted by the same rule
 * (`usd(v, v >= 1 ? 2 : 6)`). Declared as a substitution in docs/SCOPE.md.
 */
export function ChartFigure() {
  const { selectedSymbol } = useDesk();
  const market = MARKETS.find((m) => m.symbol === selectedSymbol);

  return (
    <div className="flex flex-col gap-4">
      <span className={ui.label}>{market ? `${market.symbol} price` : 'Chart'}</span>
      <div className="flex flex-wrap desk-baseline gap-12">
        <span className={ui.figure}>{market ? market.price : '-'}</span>
        {market && market.change ? (
          <span className={`${ui.mono} ${market.changeDir}`}>{market.change}</span>
        ) : null}
      </div>
    </div>
  );
}
