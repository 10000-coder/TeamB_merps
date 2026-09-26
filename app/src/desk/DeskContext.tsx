import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { MARKETS } from '../data/markets';
import { useTheme } from '../lib/theme';
import type { Tab } from './tokens';

/**
 * Desk state, mirroring the reference's own hooks:
 *   * selection is by MARKET, not index (`selected?.symbol === market.symbol`),
 *     and defaults to the first market -- which is why the settled `/trade`
 *     shows a chart with no interaction.
 *   * `tab` defaults to `memecoin`; `interval` to `"15"`.
 *   * theme is read from `html[data-theme]`, which is also what the embed URL uses.
 */
type Desk = {
  selectedSymbol: string;
  select: (symbol: string) => void;
  tab: Tab;
  setTab: (t: Tab) => void;
  query: string;
  setQuery: (q: string) => void;
  interval: string;
  setInterval: (i: string) => void;
  theme: 'light' | 'dark';
};

const Ctx = createContext<Desk | null>(null);

export function DeskProvider({ children }: { children: ReactNode }) {
  const [selectedSymbol, setSelectedSymbol] = useState(MARKETS[0]?.symbol ?? '');
  const [tab, setTab] = useState<Tab>('memecoin');
  const [query, setQuery] = useState('');
  const [interval, setChartInterval] = useState('15');
  const theme = useTheme();

  const value = useMemo<Desk>(() => ({
    selectedSymbol,
    select: setSelectedSymbol,
    tab,
    setTab,
    query,
    setQuery,
    interval,
    setInterval: setChartInterval,
    theme,
  }), [selectedSymbol, tab, query, interval, theme]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDesk(): Desk {
  const v = useContext(Ctx);
  if (!v) throw new Error('useDesk outside DeskProvider');
  return v;
}
