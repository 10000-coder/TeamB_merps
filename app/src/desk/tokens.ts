/**
 * The reference's own class tokens, read out of its bundle
 * (`1hrcx48n43rb6.js`), so the port emits the same class strings it does.
 */
export const ui = {
  panel: 'desk-panel',
  chip: 'desk-chip',
  hit: 'desk-hit',
  figure: 'desk-figure',
  input: 'desk-input',
  label: 'font-mono text-caption-10 uppercase opacity-50',
  dim: 'text-caption-20 opacity-50',
  mono: 'font-mono text-caption-20 tabular-nums',
  link: 'desk-link',
  up: 'desk-up',
  down: 'desk-down',
} as const;

/** Constants block from the reference's own config module. */
export const GMGN_EMBED_HOST = 'https://www.gmgn.cc';
export const GMGN_CHAIN = 'robinhood';
export const GMGN_SOLANA_CHAIN = 'sol';

/** The reference's market tabs, verbatim (`i` in 410-6j5gz8rd4.js). */
export const TABS = [
  { key: 'memecoin', label: 'Meme coins' },
  { key: 'stock', label: 'Stocks' },
  { key: 'custom', label: 'Listed' },
] as const;

export type Tab = (typeof TABS)[number]['key'];

/** The reference's chart intervals, verbatim (`n` in 410-6j5gz8rd4.js). */
export const INTERVALS = [
  { label: '1m', value: '1' },
  { label: '5m', value: '5' },
  { label: '15m', value: '15' },
  { label: '1h', value: '60' },
  { label: '4h', value: '240' },
  { label: '1d', value: '1d' },
] as const;
