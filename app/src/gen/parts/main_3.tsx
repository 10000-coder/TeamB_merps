import { sx, onImgError, onImgErrorHide } from '../../lib/dom';

export function main_3() {
  return (
    <>
      <main className="min-h-svh">
        <div className="divide-y">
          <section className="desk-panel">
            <span className="font-mono text-caption-10 uppercase opacity-50">
              {"Portfolio"}
            </span>
            <h1 className="text-headline-20">
              {"Your desk, start to finish"}
            </h1>
            <p className="text-caption-20 opacity-50">
              {"Balance, open risk and every settled trade. Deposits and withdrawals move real ETH; everything between them is settled here against live prices."}
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
        </div>
      </main>
    </>
  );
}
