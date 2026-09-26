import { sx, onImgError, onImgErrorHide } from '../../lib/dom';
import { useDesk } from '../../desk/DeskContext';

export function main_2({ marketList }: { marketList: React.ReactNode }) {
  const { tab, setTab, query, setQuery } = useDesk();
  return (
    <>
      <main className="min-h-svh">
        <div className="divide-y">
          <section className="desk-panel">
            <span className="font-mono text-caption-10 uppercase opacity-50">
              {"Options"}
            </span>
            <h1 className="text-headline-20">
              {"Calls and puts from one hour to a week"}
            </h1>
            <p className="text-caption-20 opacity-50">
              {"Premiums are priced with Black-Scholes off the live spot. The premium is the whole risk: a contract can expire worthless, never owing you more."}
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
                      <span className="desk-figure">
                        {"-"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="desk-chart-empty">
                  <span className="text-caption-20 opacity-50">
                    {"Pick a market to see its chart."}
                  </span>
                </div>
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
                  {"Contract"}
                </div>
                <p className="text-caption-20 opacity-50">
                  {"Pick a market to see its option chain."}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
