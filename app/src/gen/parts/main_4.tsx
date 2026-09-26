import { sx, onImgError, onImgErrorHide } from '../../lib/dom';

export function main_4() {
  return (
    <>
      <main className="min-h-svh">
        <div className="divide-y">
          <section className="desk-panel">
            <span className="font-mono text-caption-10 uppercase opacity-50">
              {"Listings"}
            </span>
            <h1 className="text-headline-20">
              {"Open a market on anything"}
            </h1>
            <p className="text-caption-20 opacity-50">
              {"You post the liquidity, you keep the edge: traders win and lose against the pool you funded, and you can top it up whenever you like."}
            </p>
            <div className="flex flex-wrap gap-8">
              <button type="button" className="desk-chip" data-active="true">
                {"List an existing token"}
              </button>
              <button type="button" className="desk-chip" data-active="false">
                {"Launch a new one"}
              </button>
            </div>
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
          <section className="desk-panel">
            <div className="font-mono text-caption-10 uppercase opacity-50">
              {"List a token"}
            </div>
            <p className="text-caption-20 opacity-50">
              {"Any token with a live pool can become a market here, on this chain or on Solana. The fee is "}
              {"0.05"}
              {" ETH and you post at least "}
              {"0.05"}
              {" ETH of liquidity, which is what pays traders who win against your pair."}
            </p>
            <div className="flex flex-wrap items-end gap-12">
              <label className="flex desk-field flex-col gap-4">
                <span className="font-mono text-caption-10 uppercase opacity-50">
                  {"Token address or Solana mint"}
                </span>
                <input className="desk-input" placeholder="0x..." defaultValue="" />
              </label>
              <button type="button" className="desk-btn desk-btn-ghost">
                <span>
                  {"Look it up"}
                </span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
