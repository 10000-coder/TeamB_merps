import { useEffect } from 'react';
import type { RouteEntry } from './gen/routes';
import { findRoute, useRoutePath } from './lib/router';
import { closeMenu } from './lib/ui';
import { DeskProvider } from './desk/DeskContext';
import { MarketList } from './desk/MarketList';
import { ChartPanel } from './desk/ChartPanel';
import { ChartFigure } from './desk/ChartFigure';
import { ChartIntervals } from './desk/ChartIntervals';

/**
 * Every part of a route's body is generated from the captured DOM. The slots are
 * the only hand-written regions -- the ones that need data. A part ignores the
 * props it does not declare, so passing all of them is harmless.
 */
function Body({ entry }: { entry: RouteEntry }) {
  const slotProps = entry.needsMarketList
    ? {
        marketList: <MarketList />,
        chart: <ChartPanel />,
        chartFigure: <ChartFigure />,
        chartIntervals: <ChartIntervals />,
      }
    : {};
  return (
    <>
      {entry.body.map((part, i) => (
        <part.component key={`${part.kind}-${i}`} {...slotProps} />
      ))}
    </>
  );
}

export function App() {
  const path = useRoutePath();
  const entry = findRoute(path) ?? findRoute('/')!;

  useEffect(() => {
    document.title = entry.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', entry.description);
    closeMenu();
  }, [entry]);

  return (
    <DeskProvider>
      <Body entry={entry} />
    </DeskProvider>
  );
}
