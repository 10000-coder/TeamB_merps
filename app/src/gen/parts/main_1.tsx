import { sx, onImgError, onImgErrorHide } from '../../lib/dom';
import { useDesk } from '../../desk/DeskContext';

export function main_1({ marketList, chart, chartFigure, chartIntervals }: { marketList: React.ReactNode; chart: React.ReactNode; chartFigure: React.ReactNode; chartIntervals: React.ReactNode }) {
  const { tab, setTab, query, setQuery } = useDesk();
  return (
    <>
      <main className="min-h-svh">
        <div className="divide-y">
          <section className="desk-panel">
            <span className="font-mono text-caption-10 uppercase opacity-50">
              {"Perpetuals"}
            </span>
            <h1 className="text-headline-20">
              {"Long or short any listed market"}
            </h1>
            <p className="text-caption-20 opacity-50">
              {"Margin is posted in ETH from your desk balance. Prices come from the live pools, and nothing about a position touches the chain until you withdraw."}
            </p>
          </section>
          <section className="desk-panel">
            <div className="flex flex-wrap items-center justify-between gap-20">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-caption-10 uppercase opacity-50">
                  {"Desk balance"}
                </span>
                <span className="desk-figure">
                  {"-"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-12">
                <div className="relative">
                  <button type="button" className="desk-btn" title="Robinhood Chain only; your wallet is asked to switch before anything is signed">
                    <span>
                      {"Connect wallet"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <div className="desk-layout">
            <div className="flex min-w-0 flex-col divide-y">
              <section className="desk-panel">
                <div className="flex flex-wrap items-start justify-between gap-12">
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-caption-10 uppercase opacity-50">
                      {"Chart"}
                    </span>
                    <div className="flex flex-wrap desk-baseline gap-12">
                      {chartFigure}
                    </div>
                  </div>
                  {chartIntervals}
                </div>
                {chart}
              </section>
              <section className="desk-panel">
                <div className="flex flex-wrap items-center justify-between gap-12">
                  <div className="flex flex-wrap gap-8">
                    <button type="button" className="desk-chip" data-active={tab === "memecoin"} onClick={() => setTab("memecoin")}>
                      {"Meme coins"}
                    </button>
                    <button type="button" className="desk-chip" data-active={tab === "stock"} onClick={() => setTab("stock")}>
                      {"Stocks"}
                    </button>
                    <button type="button" className="desk-chip" data-active={tab === "custom"} onClick={() => setTab("custom")}>
                      {"Listed"}
                    </button>
                  </div>
                  <input className="desk-input desk-search" placeholder="Search a market" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                {marketList}
              </section>
            </div>
            <div className="desk-sticky">
              <section className="desk-panel">
                <div className="font-mono text-caption-10 uppercase opacity-50">
                  {"Order"}
                </div>
                <p className="text-caption-20 opacity-50">
                  {"Pick a market to place a trade."}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
