import { sx, onImgError, onImgErrorHide } from '../../lib/dom';

export function main_0() {
  return (
    <>
      <main className="min-h-svh">
        <div data-page-builder-section="heroSection" className="relative">
          <div className="vt-exclude size-full absolute inset-0">
            <div className="size-full">
              <div className="relative z-0 size-full select-none" style={sx("position:relative;width:100%;height:100%;overflow:hidden;pointer-events:auto;background-color:rgb(224, 224, 224)")}>
                <div style={sx("width:100%;height:100%")}>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-1 hidden lg:block">
            <div className="grid min-h-[calc(100svh-var(--site-header-height))] grid-rows-2">
              <div className="sticky top-(--site-header-height) grid grid-cols-2 divide-x">
                <div className="flex items-end bg-theme-bg p-20 text-theme-fg shadow-border-b">
                  <span className="">
                    <h1 className="text-headline-50 leading-none">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"MERPS"}
                        </span>
                      </span>
                    </h1>
                  </span>
                </div>
                <div>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x">
                <div>
                </div>
                <div className="inset-shadow-border-t grid grid-cols-2">
                  <div className="flex flex-col gap-20 bg-theme-fg p-20 text-theme-bg">
                    <div className="text-body-20">
                      <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] text-body-20">
                        <div className="empty:hidden" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Perpetuals and options, settled"}
                              {" "}
                            </span>
                          </span>
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"in ETH. Long or short meme coins"}
                              {" "}
                            </span>
                          </span>
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"and tokenised stocks up to 5x, buy"}
                              {" "}
                            </span>
                          </span>
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"calls and puts from one hour to a"}
                              {" "}
                            </span>
                          </span>
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"week, or list a market yourself."}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <a href="/trade" draggable="false" className="relative isolate inline-flex min-w-0 shrink-0 items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-fg text-theme-bg before:bg-mint hover:text-black motion-reduce:hover:bg-mint motion-reduce:hover:text-black motion-reduce:before:hidden h-36 px-12 font-mono text-caption-10 uppercase before:origin-left mt-auto w-full">
                      <span data-inner="true" className="relative z-10 flex w-full min-w-0 flex-row items-center justify-between gap-8">
                        {"Start trading"}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0">
                          <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
                        </svg>
                      </span>
                    </a>
                  </div>
                  <div className="flex flex-col bg-mint text-black">
                    <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] p-20 text-body-20">
                      <div className="empty:hidden" data-text="true">
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"Prices come from the live pools."}
                            {" "}
                          </span>
                        </span>
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"Every fill and payout is priced on"}
                            {" "}
                          </span>
                        </span>
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"the server, never from your browser."}
                          </span>
                        </span>
                      </div>
                      <div className="empty:hidden" data-text="true">
                      </div>
                      <div className="empty:hidden" data-text="true">
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"Built on:"}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div data-marqy="" data-direction="left" className="vt-exclude mt-auto **:data-marqy-inner:gap-8">
                      <div data-marqy-inner="">
                        <div data-marqy-content="" style={sx("animation-duration:12.8s")}>
                          <div data-marqy-item="">
                            <div className="flex gap-8">
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <path d="M14 40a20 20 0 0 1 36 0" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="32" cy="46" r="4" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"Robinhood Chain"}
                                  </span>
                                </span>
                              </div>
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="32" cy="32" r="9" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"ETH settled"}
                                  </span>
                                </span>
                              </div>
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="32" cy="32" r="3" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"Up to 5x"}
                                  </span>
                                </span>
                              </div>
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <rect x="8" y="40" width="14" height="16" fill="currentColor" />
                                    <rect x="25" y="28" width="14" height="28" fill="currentColor" />
                                    <rect x="42" y="14" width="14" height="42" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"1h to 7d options"}
                                  </span>
                                </span>
                              </div>
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <rect x="7" y="16" width="50" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <path d="M7 26h50" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="45" cy="38" r="4" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"List any token"}
                                  </span>
                                </span>
                              </div>
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <path d="M36 6 14 36h13l-3 22 22-30H33z" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"No sign-up"}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div data-marqy-content="" style={sx("animation-duration:12.8s")}>
                          <div aria-hidden="true" data-marqy-item="">
                            <div className="flex gap-8">
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <path d="M14 40a20 20 0 0 1 36 0" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="32" cy="46" r="4" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"Robinhood Chain"}
                                  </span>
                                </span>
                              </div>
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="32" cy="32" r="9" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"ETH settled"}
                                  </span>
                                </span>
                              </div>
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="32" cy="32" r="3" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"Up to 5x"}
                                  </span>
                                </span>
                              </div>
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <rect x="8" y="40" width="14" height="16" fill="currentColor" />
                                    <rect x="25" y="28" width="14" height="28" fill="currentColor" />
                                    <rect x="42" y="14" width="14" height="42" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"1h to 7d options"}
                                  </span>
                                </span>
                              </div>
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <rect x="7" y="16" width="50" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                                    <path d="M7 26h50" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="45" cy="38" r="4" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"List any token"}
                                  </span>
                                </span>
                              </div>
                              <div className="flex h-80 w-100 items-center justify-center">
                                <span className="flex flex-col items-center justify-center gap-8 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                    <path d="M36 6 14 36h13l-3 22 22-30H33z" fill="currentColor" />
                                  </svg>
                                  <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                    {"No sign-up"}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid divide-y">
              <div className="grid min-h-[calc(50svh-var(--site-header-height)/2)] grid-cols-2 divide-x">
                <div>
                </div>
                <div className="flex min-w-0 items-end bg-grey p-20 text-black">
                  <span className="">
                    <p className="text-headline-50">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"Open"}
                        </span>
                      </span>
                    </p>
                  </span>
                </div>
              </div>
              <div className="grid min-h-[65svh] grid-cols-2">
                <div className="flex min-w-0 flex-col bg-theme-fg p-20 text-theme-bg">
                  <p className="@container flex w-full min-w-0 flex-col gap-8 uppercase">
                    <span className="block w-max max-w-full overflow-hidden mr-auto">
                      <span className="block whitespace-nowrap leading-[0.82] antialiased text-headline-50" style={sx("opacity:1;transform:none;font-size:22.0946cqw")}>
                        {"any"}
                      </span>
                    </span>
                    <span className="block w-max max-w-full overflow-hidden ml-auto">
                      <span className="block whitespace-nowrap leading-[0.82] antialiased text-headline-50" style={sx("opacity:1;transform:none;font-size:22.0946cqw")}>
                        {"market"}
                      </span>
                    </span>
                  </p>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-1 block lg:hidden">
            <div className="relative">
              <div className="sticky top-(--site-header-height) grid grid-cols-2 divide-x">
                <div className="flex items-end bg-theme-bg px-12 pt-188 pb-20 text-theme-fg shadow-border-b">
                  <span className="">
                    <h1 className="text-headline-50">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"MERPS"}
                        </span>
                      </span>
                    </h1>
                  </span>
                </div>
                <div>
                </div>
              </div>
              <div className="relative grid grid-cols-2 divide-x">
                <div>
                </div>
                <div className="inset-shadow-border-t flex min-w-0 items-end bg-grey px-12 pt-188 pb-20 text-black">
                  <span className="">
                    <p className="text-headline-50">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"Open"}
                        </span>
                      </span>
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-theme-fg px-12 py-20 text-theme-bg">
              <p className="@container flex w-full min-w-0 flex-col gap-8 uppercase">
                <span className="block w-max max-w-full overflow-hidden mr-auto">
                  <span className="block whitespace-nowrap leading-[0.82] antialiased text-headline-50" style={sx("opacity:1;transform:none")}>
                    {"any"}
                  </span>
                </span>
                <span className="block w-max max-w-full overflow-hidden ml-auto">
                  <span className="block whitespace-nowrap leading-[0.82] antialiased text-headline-50" style={sx("opacity:1;transform:none")}>
                    {"market"}
                  </span>
                </span>
              </p>
            </div>
            <div>
              <div className="flex flex-col gap-188 bg-theme-fg px-12 py-20 text-theme-bg">
                <div className="text-body-20">
                  <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] text-body-20">
                    <div className="empty:hidden" data-text="true">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"Perpetuals and options, settled in ETH. Long or short meme coins and tokenised stocks up to 5x, buy calls and puts from one hour to a week, or list a market yourself."}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <a href="/trade" draggable="false" className="relative isolate inline-flex w-fit min-w-0 shrink-0 items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-bg text-theme-fg before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg motion-reduce:hover:text-theme-bg motion-reduce:before:hidden h-36 px-12 font-mono text-caption-10 uppercase before:origin-left ml-auto">
                  <span data-inner="true" className="relative z-10 flex w-full min-w-0 flex-row items-center justify-between gap-8">
                    {"Start trading"}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0">
                      <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
                    </svg>
                  </span>
                </a>
              </div>
              <div className="flex flex-col bg-mint text-black">
                <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] px-12 pt-20 pb-188 text-body-20">
                  <div className="empty:hidden" data-text="true">
                    <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                      <span className="line" style={sx("display:block")}>
                        {"Prices come from the live pools. Every fill, payout and withdrawal is priced on the server, never from anything your browser sends."}
                      </span>
                    </span>
                  </div>
                  <div className="empty:hidden" data-text="true">
                  </div>
                  <div className="empty:hidden" data-text="true">
                    <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                      <span className="line" style={sx("display:block")}>
                        {"Built on:"}
                      </span>
                    </span>
                  </div>
                </div>
                <div data-marqy="" data-direction="left" className="vt-exclude mt-auto **:data-marqy-inner:gap-8">
                  <div data-marqy-inner="">
                    <div data-marqy-content="" style={sx("animation-duration:0s")}>
                      <div data-marqy-item="">
                        <div className="flex gap-8">
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                <path d="M14 40a20 20 0 0 1 36 0" fill="none" stroke="currentColor" strokeWidth="4" />
                                <circle cx="32" cy="46" r="4" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"Robinhood Chain"}
                              </span>
                            </span>
                          </div>
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                <circle cx="32" cy="32" r="9" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"ETH settled"}
                              </span>
                            </span>
                          </div>
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="4" />
                                <circle cx="32" cy="32" r="3" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"Up to 5x"}
                              </span>
                            </span>
                          </div>
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <rect x="8" y="40" width="14" height="16" fill="currentColor" />
                                <rect x="25" y="28" width="14" height="28" fill="currentColor" />
                                <rect x="42" y="14" width="14" height="42" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"1h to 7d options"}
                              </span>
                            </span>
                          </div>
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <rect x="7" y="16" width="50" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                                <path d="M7 26h50" stroke="currentColor" strokeWidth="4" />
                                <circle cx="45" cy="38" r="4" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"List any token"}
                              </span>
                            </span>
                          </div>
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <path d="M36 6 14 36h13l-3 22 22-30H33z" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"No sign-up"}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-marqy-content="" style={sx("animation-duration:0s")}>
                      <div aria-hidden="true" data-marqy-item="">
                        <div className="flex gap-8">
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                <path d="M14 40a20 20 0 0 1 36 0" fill="none" stroke="currentColor" strokeWidth="4" />
                                <circle cx="32" cy="46" r="4" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"Robinhood Chain"}
                              </span>
                            </span>
                          </div>
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                <circle cx="32" cy="32" r="9" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"ETH settled"}
                              </span>
                            </span>
                          </div>
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                                <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="4" />
                                <circle cx="32" cy="32" r="3" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"Up to 5x"}
                              </span>
                            </span>
                          </div>
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <rect x="8" y="40" width="14" height="16" fill="currentColor" />
                                <rect x="25" y="28" width="14" height="28" fill="currentColor" />
                                <rect x="42" y="14" width="14" height="42" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"1h to 7d options"}
                              </span>
                            </span>
                          </div>
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <rect x="7" y="16" width="50" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                                <path d="M7 26h50" stroke="currentColor" strokeWidth="4" />
                                <circle cx="45" cy="38" r="4" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"List any token"}
                              </span>
                            </span>
                          </div>
                          <div className="flex h-80 w-100 items-center justify-center">
                            <span className="flex flex-col items-center justify-center gap-8 text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={sx("width:32px;height:32px;flex-shrink:0")}>
                                <path d="M36 6 14 36h13l-3 22 22-30H33z" fill="currentColor" />
                              </svg>
                              <span className="font-mono text-caption-10 uppercase opacity-60" style={sx("white-space:nowrap")}>
                                {"No sign-up"}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="about" data-page-builder-section="statsSection" className="relative z-1 scroll-mt-(--site-header-height) border-t bg-theme-bg">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x">
            <div className="px-12 py-20 lg:px-20">
              <div className="flex items-center gap-12">
                <span className="block size-8 shrink-0 bg-black">
                </span>
                <p className="font-mono text-caption-10 uppercase">
                  {"About MERPS"}
                </p>
              </div>
            </div>
            <div className="px-12 pt-168 pb-20 lg:px-20 lg:pt-20 lg:pb-348">
              <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] text-body-30">
                <div className="empty:hidden" data-text="true">
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"Every venue picks your markets for you. The coin"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"you actually want is not listed, the stock is on"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"a different app, options are somewhere else"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"again, and the thing you launched this morning"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"is nowhere at all. So you sit on your hands and"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"wait for somebody to list it."}
                    </span>
                  </span>
                </div>
                <div className="empty:hidden" data-text="true">
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"MERPS lets you open the market instead. Meme"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"coins and tokenised stocks trade here at up to"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"5x, calls and puts run from one hour to a week,"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"and anything with a live pool can be listed for"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"0.05 ETH plus the liquidity that backs it. You"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"deposit ETH, the house takes the other side,"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"and every payout is priced on the server."}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 *:min-h-200 lg:grid-cols-4 lg:grid-rows-[repeat(5,--spacing(200))]">
              <div className="flex flex-col justify-between px-12 py-20 lg:px-20 bg-black text-white -mb-1 -ml-1 lg:sticky lg:top-(--site-header-height) lg:col-start-3 lg:row-start-1">
                <span className="contents">
                  <p className="w-fit text-digit-10">
                    <span>
                      <span className="sr-only">
                        {"5x"}
                      </span>
                      <span aria-hidden="true" className="flex items-center">
                        <span className="relative inline-block overflow-hidden align-baseline" style={sx("height:1em;line-height:1em")}>
                          <span className="invisible">
                            {"5"}
                          </span>
                          <span className="absolute inset-x-0 top-0 flex flex-col" style={sx("transform:translateY(-5em)")}>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"0"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"1"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"2"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"3"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"4"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")}>
                              {"5"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"6"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"7"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"8"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"9"}
                            </span>
                          </span>
                        </span>
                        <span>
                          {"x"}
                        </span>
                      </span>
                    </span>
                  </p>
                </span>
                <p className="mt-auto">
                  {"Leverage on meme coins and tokenised stocks. Pairs listed by users trade at 2x."}
                </p>
              </div>
              <div className="flex flex-col justify-between px-12 py-20 lg:px-20 bg-mint text-black lg:col-span-2 lg:col-start-1 lg:row-span-4 lg:row-start-2 lg:border-t lg:border-r [&>p:nth-child(2)]:ml-auto">
                <span className="contents">
                  <p className="w-fit text-digit-30">
                    <span>
                      <span className="sr-only">
                        {"10"}
                      </span>
                      <span aria-hidden="true" className="flex items-center">
                        <span className="relative inline-block overflow-hidden align-baseline" style={sx("height:1em;line-height:1em")}>
                          <span className="invisible">
                            {"1"}
                          </span>
                          <span className="absolute inset-x-0 top-0 flex flex-col" style={sx("transform:translateY(-1em)")}>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"0"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")}>
                              {"1"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"2"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"3"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"4"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"5"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"6"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"7"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"8"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"9"}
                            </span>
                          </span>
                        </span>
                        <span className="relative inline-block overflow-hidden align-baseline" style={sx("height:1em;line-height:1em")}>
                          <span className="invisible">
                            {"0"}
                          </span>
                          <span className="absolute inset-x-0 top-0 flex flex-col" style={sx("transform:none")}>
                            <span className="block" style={sx("height:1em;line-height:1em")}>
                              {"0"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"1"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"2"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"3"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"4"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"5"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"6"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"7"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"8"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"9"}
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </p>
                </span>
                <p className="mt-auto">
                  {"Times your notional is the most a single call can pay. Contracts settle in ETH, in cash."}
                </p>
              </div>
              <div className="flex flex-col justify-between px-12 py-20 lg:px-20 bg-grey text-black lg:sticky lg:top-(--site-header-height) lg:col-start-4 lg:row-span-2 lg:row-start-2 lg:border-t lg:border-l lg:shadow-border-b">
                <span className="contents">
                  <p className="w-fit text-digit-20">
                    <span>
                      <span className="sr-only">
                        {"2"}
                      </span>
                      <span aria-hidden="true" className="flex items-center">
                        <span className="relative inline-block overflow-hidden align-baseline" style={sx("height:1em;line-height:1em")}>
                          <span className="invisible">
                            {"2"}
                          </span>
                          <span className="absolute inset-x-0 top-0 flex flex-col" style={sx("transform:translateY(-2em)")}>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"0"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"1"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")}>
                              {"2"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"3"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"4"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"5"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"6"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"7"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"8"}
                            </span>
                            <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                              {"9"}
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </p>
                </span>
                <p className="mt-auto">
                  {"Ways to open a market: list a token that already trades, or launch a new one here."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="rules" data-page-builder-section="insightsSection" className="scroll-mt-(--site-header-height)">
          <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:divide-x">
            <div className="relative z-1 flex flex-col gap-60 border-t bg-theme-bg px-12 py-20 text-black lg:sticky lg:top-(--site-header-height) lg:min-h-[calc(100svh-var(--site-header-height))] lg:bg-grey lg:px-20">
              <h2 className="@container flex w-full min-w-0 flex-col gap-8 uppercase">
                <span className="block w-max max-w-full overflow-hidden mr-auto">
                  <span className="block whitespace-nowrap leading-[0.82] antialiased text-headline-50" style={sx("opacity:1;transform:none;font-size:15.8504cqw")}>
                    {"List it."}
                  </span>
                </span>
                <span className="block w-max max-w-full overflow-hidden ml-auto">
                  <span className="block whitespace-nowrap leading-[0.82] antialiased text-headline-50" style={sx("opacity:1;transform:none;font-size:15.8504cqw")}>
                    {"Trade"}
                  </span>
                </span>
                <span className="block w-max max-w-full overflow-hidden mr-auto">
                  <span className="block whitespace-nowrap leading-[0.82] antialiased text-headline-50" style={sx("opacity:1;transform:none;font-size:15.8504cqw")}>
                    {"it live."}
                  </span>
                </span>
              </h2>
              <div className="mt-auto ml-auto flex flex-col gap-188 lg:w-1/2 lg:gap-60">
                <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] max-w-400">
                  <div className="empty:hidden" data-text="true">
                    <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                      <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                        {"Four parts, one engine. Perpetuals,"}
                        {" "}
                      </span>
                    </span>
                    <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                      <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                        {"options, the pricing model and the"}
                        {" "}
                      </span>
                    </span>
                    <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                      <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                        {"listings all read the same market data,"}
                        {" "}
                      </span>
                    </span>
                    <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                      <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                        {"so what you see quoted is what the"}
                        {" "}
                      </span>
                    </span>
                    <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                      <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                        {"server settles you at, to the wei."}
                      </span>
                    </span>
                  </div>
                </div>
                <a href="/trade" draggable="false" className="relative isolate inline-flex w-fit items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-fg text-theme-bg before:bg-mint hover:text-black motion-reduce:hover:bg-mint motion-reduce:hover:text-black motion-reduce:before:hidden h-36 px-12 font-mono text-caption-10 uppercase before:origin-left ml-auto min-w-200 shrink-0 lg:ml-0">
                  <span data-inner="true" className="relative z-10 flex w-full min-w-0 flex-row items-center justify-between gap-8">
                    {"Start trading"}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0">
                      <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            <div className="relative z-1 divide-y divide-current/20 overflow-visible border-t bg-theme-fg text-theme-bg">
              <div className="grid grid-cols-1 gap-80 overflow-visible px-12 py-20 lg:min-h-[calc(50svh-var(--site-header-height))] lg:grid-cols-2 lg:grid-rows-1 lg:gap-60 lg:p-40">
                <div className="flex flex-col gap-24 lg:gap-60">
                  <div className="grid grid-cols-2 gap-20 overflow-visible lg:hidden">
                    <span className="block pt-[0.2em] font-mono text-caption-20 opacity-50">
                      {"01"}
                    </span>
                    <div>
                      <div className="ml-auto max-w-200">
                        <svg id="_R_156jklubtaeivb_" aria-label="Perpetual markets animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="400" cy="400" r="398.5" strokeDasharray="4 7" strokeWidth="4" style={sx("transform-box:fill-box;transform-origin:50% 50%;transform:rotate(65deg)")} />
                          <circle cx="200" cy="400" r="199.5" strokeWidth="1.5" />
                          <circle cx="600" cy="400" r="199.5" strokeWidth="1.5" />
                          <ellipse cx="400" cy="400" rx="200" ry="200" strokeOpacity="0" style={sx("transform:translateX(200px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="192.17243681861146" ry="200" strokeOpacity="0.7183219365979312" style={sx("transform:translateX(192.055px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="167.23408739671868" ry="200" strokeOpacity="0.9216090541885933" style={sx("transform:translateX(168.696px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="129.88377379598387" ry="200" strokeOpacity="0.9805785293428926" style={sx("transform:translateX(131.805px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="83.4491229919222" ry="200" strokeOpacity="0.9968724762002239" style={sx("transform:translateX(83.9005px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="29.934251676648273" ry="200" strokeOpacity="0.9999108187766979" style={sx("transform:translateX(28.7684px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="29.934251676648273" ry="200" strokeOpacity="0.9999108187766979" style={sx("transform:translateX(-28.7684px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="83.4491229919222" ry="200" strokeOpacity="0.9968724762002239" style={sx("transform:translateX(-83.9005px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="129.88377379598387" ry="200" strokeOpacity="0.9805785293428926" style={sx("transform:translateX(-131.805px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="167.23408739671868" ry="200" strokeOpacity="0.9216090541885933" style={sx("transform:translateX(-168.696px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="192.17243681861146" ry="200" strokeOpacity="0.7183219365979312" style={sx("transform:translateX(-192.055px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="200" ry="200" strokeOpacity="0" style={sx("transform:translateX(200px);transform-origin:50% 50%;transform-box:fill-box")} />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="hidden gap-20 lg:grid lg:grid-cols-[auto_1fr]">
                    <span className="block pt-[0.2em] font-mono text-caption-20 opacity-50">
                      {"01"}
                    </span>
                    <div className="flex flex-col gap-80">
                      <h3 className="whitespace-pre-line text-headline-10">
                        <span className="">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Perpetual"}
                              {" "}
                            </span>
                          </span>
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"markets"}
                            </span>
                          </span>
                        </span>
                      </h3>
                      <div className="mt-auto hidden w-[70%] overflow-visible lg:block">
                        <svg id="_R_596jklubtaeivb_" aria-label="Perpetual markets animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="400" cy="400" r="398.5" strokeDasharray="4 7" strokeWidth="4" style={sx("transform-box:fill-box;transform-origin:50% 50%;transform:none")} />
                          <circle cx="200" cy="400" r="199.5" strokeWidth="1.5" />
                          <circle cx="600" cy="400" r="199.5" strokeWidth="1.5" />
                          <ellipse cx="400" cy="400" rx="140.49556590644352" ry="200" strokeOpacity="0.971510023882729" style={sx("transform:translateX(-142.37px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="175.01552582909062" ry="200" strokeOpacity="0.890933184462483" style={sx("transform:translateX(-176.102px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="195.98581083228055" ry="200" strokeOpacity="0.6074910595925758" style={sx("transform:translateX(-195.542px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="199.7162891083426" ry="200" strokeOpacity="0.26349932358425576" style={sx("transform:translateX(199.466px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="187.2500026877824" ry="200" strokeOpacity="0.7970689853100339" style={sx("transform:translateX(187.424px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="158.70395491692761" ry="200" strokeOpacity="0.9440078498009825" style={sx("transform:translateX(160.46px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="118.88379796077788" ry="200" strokeOpacity="0.9870851216692245" style={sx("transform:translateX(120.375px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="70.33425805495062" ry="200" strokeOpacity="0.9983398574840976" style={sx("transform:translateX(70.2696px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="15.360938735466334" ry="200" strokeOpacity="0.9999897413508734" style={sx("transform:translateX(14.1984px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="44.2155517750507" ry="200" strokeOpacity="0.9996701781201409" style={sx("transform:translateX(-43.2009px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="96.21607913392654" ry="200" strokeOpacity="0.9946361376642017" style={sx("transform:translateX(-96.8601px);transform-origin:50% 50%;transform-box:fill-box")} />
                          <ellipse cx="400" cy="400" rx="140.49556590644352" ry="200" strokeOpacity="0.971510023882729" style={sx("transform:translateX(-142.37px);transform-origin:50% 50%;transform-box:fill-box")} />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-24 lg:gap-60">
                  <h3 className="block whitespace-pre-line text-headline-10 lg:hidden">
                    <span className="">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"Perpetual"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"markets"}
                        </span>
                      </span>
                    </span>
                  </h3>
                  <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0]">
                    <div className="empty:hidden" data-text="true">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"Long or short any listed market with ETH"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"margin. Meme coins and tokenised stocks"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"go to 5x, pairs listed by users to 2x."}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"The margin you post is the whole risk:"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"nothing can take more than that."}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] mt-auto">
                    <ul className="flex list-none flex-col gap-8">
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"ETH margin, ETH settlement"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"5x meme coins and stocks"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"2x on user listed pairs"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"0.005 ETH minimum size"}
                            </span>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-80 overflow-visible px-12 py-20 lg:min-h-[calc(50svh-var(--site-header-height))] lg:grid-cols-2 lg:grid-rows-1 lg:gap-60 lg:p-40">
                <div className="flex flex-col gap-24 lg:gap-60">
                  <div className="grid grid-cols-2 gap-20 overflow-visible lg:hidden">
                    <span className="block pt-[0.2em] font-mono text-caption-20 opacity-50">
                      {"02"}
                    </span>
                    <div>
                      <div className="ml-auto max-w-200">
                        <svg id="_R_15ajklubtaeivb_-fig2" aria-label="Options book animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none" strokeWidth="2" stroke="currentColor">
                          <mask id="_R_15ajklubtaeivb_-fig2-m1">
                            <circle cx="400" cy="400" r="390" fill="#fff" />
                          </mask>
                          <g mask="url(#_R_15ajklubtaeivb_-fig2-m1)">
                            <rect y="100" width="800" height="600" style={sx("transform-box:fill-box;transform-origin:50% 50%;transform:scaleY(1.25)")} />
                            <path d="M0,300 800,300" style={sx("transform:translateY(-150px);transform-origin:50% 50%;transform-box:fill-box")} />
                            <path d="M0,500 800,500" style={sx("transform:translateY(150px);transform-origin:50% 50%;transform-box:fill-box")} />
                          </g>
                          <mask id="_R_15ajklubtaeivb_-fig2-m2">
                            <rect width="800" height="800" fill="#fff" />
                            <circle cx="400" cy="400" r="390" fill="#000" />
                          </mask>
                          <g mask="url(#_R_15ajklubtaeivb_-fig2-m2)" strokeDasharray="4 7" strokeWidth="4">
                            <rect y="100" width="800" height="600" style={sx("transform-box:fill-box;transform-origin:50% 50%;transform:scaleY(1.25)")} />
                            <path d="M0,300 800,300" style={sx("transform:translateY(-150px);transform-origin:50% 50%;transform-box:fill-box")} />
                            <path d="M0,500 800,500" style={sx("transform:translateY(150px);transform-origin:50% 50%;transform-box:fill-box")} />
                          </g>
                          <circle cx="400" cy="400" r="390" />
                          <ellipse cx="400" cy="400" rx="195" ry="390" strokeOpacity="1" />
                          <ellipse cx="400" cy="400" rx="96.7802481687977" ry="390" strokeOpacity="0.8947742629930144" />
                          <ellipse cx="400" cy="400" rx="25.66435362008633" ry="390" strokeOpacity="0.5792525374650722" />
                          <ellipse cx="400" cy="400" rx="390" ry="390" strokeOpacity="0" />
                          <ellipse cx="400" cy="400" rx="364.33564637991367" ry="390" strokeOpacity="0.5792525374650722" />
                          <ellipse cx="400" cy="400" rx="293.2197518312023" ry="390" strokeOpacity="0.8947742629930144" />
                          <ellipse cx="400" cy="400" rx="195" ry="390" strokeOpacity="1" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="hidden gap-20 lg:grid lg:grid-cols-[auto_1fr]">
                    <span className="block pt-[0.2em] font-mono text-caption-20 opacity-50">
                      {"02"}
                    </span>
                    <div className="flex flex-col gap-80">
                      <h3 className="whitespace-pre-line text-headline-10">
                        <span className="">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Options"}
                              {" "}
                            </span>
                          </span>
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"book"}
                            </span>
                          </span>
                        </span>
                      </h3>
                      <div className="mt-auto hidden w-[70%] overflow-visible lg:block">
                        <svg id="_R_59ajklubtaeivb_-fig2" aria-label="Options book animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none" strokeWidth="2" stroke="currentColor">
                          <mask id="_R_59ajklubtaeivb_-fig2-m1">
                            <circle cx="400" cy="400" r="390" fill="#fff" />
                          </mask>
                          <g mask="url(#_R_59ajklubtaeivb_-fig2-m1)">
                            <rect y="100" width="800" height="600" style={sx("transform-box:fill-box;transform-origin:50% 50%;transform:none")} />
                            <path d="M0,300 800,300" style={sx("transform:none;transform-origin:50% 50%;transform-box:fill-box")} />
                            <path d="M0,500 800,500" style={sx("transform:none;transform-origin:50% 50%;transform-box:fill-box")} />
                          </g>
                          <mask id="_R_59ajklubtaeivb_-fig2-m2">
                            <rect width="800" height="800" fill="#fff" />
                            <circle cx="400" cy="400" r="390" fill="#000" />
                          </mask>
                          <g mask="url(#_R_59ajklubtaeivb_-fig2-m2)" strokeDasharray="4 7" strokeWidth="4">
                            <rect y="100" width="800" height="600" style={sx("transform-box:fill-box;transform-origin:50% 50%;transform:none")} />
                            <path d="M0,300 800,300" style={sx("transform:none;transform-origin:50% 50%;transform-box:fill-box")} />
                            <path d="M0,500 800,500" style={sx("transform:none;transform-origin:50% 50%;transform-box:fill-box")} />
                          </g>
                          <circle cx="400" cy="400" r="390" />
                          <ellipse cx="400" cy="400" rx="310.0186790662701" ry="390" strokeOpacity="0.8538982952333755" />
                          <ellipse cx="400" cy="400" rx="215.10612151032547" ry="390" strokeOpacity="0.9907331378752133" />
                          <ellipse cx="400" cy="400" rx="114.509090584761" ry="390" strokeOpacity="0.9279342563549289" />
                          <ellipse cx="400" cy="400" rx="36.42746075667674" ry="390" strokeOpacity="0.6631921888544458" />
                          <ellipse cx="400" cy="400" rx="1.0009176845778711" ry="390" strokeOpacity="0.12111681429843885" />
                          <ellipse cx="400" cy="400" rx="373.17965046706377" ry="390" strokeOpacity="0.4829587713320507" />
                          <ellipse cx="400" cy="400" rx="310.0186790662701" ry="390" strokeOpacity="0.8538982952333755" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-24 lg:gap-60">
                  <h3 className="block whitespace-pre-line text-headline-10 lg:hidden">
                    <span className="">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"Options"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"book"}
                        </span>
                      </span>
                    </span>
                  </h3>
                  <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0]">
                    <div className="empty:hidden" data-text="true">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"Calls and puts on the same markets, cash"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"settled in ETH. Premiums are priced with"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"Black-Scholes off the live spot, and you"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"can sell back to the house any time or"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"leave it to settle at expiry."}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] mt-auto">
                    <ul className="flex list-none flex-col gap-8">
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"One hour to seven days"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Calls and puts, nine strikes"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"The premium is the max loss"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Expiries swept automatically"}
                            </span>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-80 overflow-visible px-12 py-20 lg:min-h-[calc(50svh-var(--site-header-height))] lg:grid-cols-2 lg:grid-rows-1 lg:gap-60 lg:p-40">
                <div className="flex flex-col gap-24 lg:gap-60">
                  <div className="grid grid-cols-2 gap-20 overflow-visible lg:hidden">
                    <span className="block pt-[0.2em] font-mono text-caption-20 opacity-50">
                      {"03"}
                    </span>
                    <div>
                      <div className="ml-auto max-w-200">
                        <svg id="_R_15ejklubtaeivb_" aria-label="Execution model animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 6" style={sx("transform:rotate(-50deg)")}>
                          <circle cx="400" cy="400" r="399" strokeDasharray="none" />
                          <path d="M420,400 752.7056933085033,394.13996117829157" />
                          <path d="M419.8358002764649,402.5575432336901 761.8245723806062,442.3072315595607" />
                          <path d="M419.3458972607806,405.07309167819017 764.1325257656131,492.5575796348276" />
                          <path d="M418.5383351469204,407.50534009758746 757.7262179018329,543.0394528431483" />
                          <path d="M417.42637408246776,409.81435104007875 742.1787775101158,591.76503680127" />
                          <path d="M416.02827243735913,411.9622106098243 718.0359750875768,636.9788824597871" />
                          <path d="M414.36698700195456,413.91365101206975 686.4524337183719,677.3626272900583" />
                          <path d="M412.46979603717466,415.6366296493606 648.4257815986083,711.354550857201" />
                          <path d="M410.3678513662105,417.10285526010694 605.5353628391298,737.974819069134" />
                          <path d="M408.0956668624479,418.28825246031624 559.4153440304447,756.2750415577782" />
                          <path d="M405.69055173262063,419.1733570607332 511.89098437183105,765.3418255323306" />
                          <path d="M403.19199790066756,419.743635668289 465.0607048155469,764.9654528907369" />
                          <path d="M400.6410315514331,419.98972432401376 420.84056042157056,756.2262711328883" />
                          <path d="M398.0795394818464,419.90758225898395 380.26065420882054,741.3616508328084" />
                          <path d="M395.5495813208737,419.49855824363647 343.20877173099905,722.7535935984206" />
                          <path d="M393.09269891157385,418.7693684409952 308.99219503882324,701.7967292969031" />
                          <path d="M390.7492341951833,417.73198612746 276.9413230275282,678.9397171232719" />
                          <path d="M388.55766679755664,416.40344509193915 246.72917182863432,654.0515509786351" />
                          <path d="M386.55398219477365,414.8055599415063 218.21559983786105,626.963434375693" />
                          <path d="M384.7710808326173,412.96456790615576 190.1649795439771,598.332296990747" />
                          <path d="M383.2382379021632,410.910698024211 163.1759434374381,567.3544749552924" />
                          <path d="M381.98062264195164,408.6776747823512 136.94179870631973,534.019785394031" />
                          <path d="M381.0188850597866,406.30216436047243 111.1571762119267,498.2220548544325" />
                          <path d="M380.3688168601787,403.82317257402747 86.00882120305725,459.6376194774151" />
                          <path d="M380.0410921449933,401.28140439961425 62.93657553628523,417.81536642963283" />
                          <path d="M380.0410921449933,398.71859560038575 80.54576260408291,371.1632916436059" />
                          <path d="M380.3688168601787,396.17682742597253 100.72489451377034,327.7491772036135" />
                          <path d="M381.0188850597866,393.69783563952757 121.95911005922547,287.42396814688937" />
                          <path d="M381.98062264195164,391.3223252176488 143.9853958401788,249.88463643668769" />
                          <path d="M383.2382379021632,389.08930197578906 167.06086981377322,214.94261400249036" />
                          <path d="M384.7710808326173,387.03543209384424 191.46248167278844,182.52209687051547" />
                          <path d="M386.55398219477365,385.1944400584937 216.4622032920085,152.07621942765417" />
                          <path d="M388.5576667975566,383.5965549080609 243.35925281692099,123.96600757577932" />
                          <path d="M390.7492341951833,382.26801387254 272.2565473329751,98.09125104144658" />
                          <path d="M393.09269891157385,381.2306315590048 303.4518490777717,74.37632583696973" />
                          <path d="M395.5495813208737,380.50144175636353 337.67124837064404,53.19159461659487" />
                          <path d="M398.0795394818464,380.09241774101605 375.8061150190311,35.68683121480973" />
                          <path d="M400.6410315514331,380.01027567598624 418.31931805378167,23.870886913254008" />
                          <path d="M403.19199790066756,380.256364331711 464.5212449684901,19.727559256517168" />
                          <path d="M405.69055173262063,380.8266429392668 512.6747483520371,24.346150905710594" />
                          <path d="M408.0956668624479,381.71174753968376 560.6732865572576,37.739132818111145" />
                          <path d="M410.3678513662105,382.89714473989306 606.5784255427839,59.276206801498624" />
                          <path d="M412.46979603717466,384.3633703506394 648.6345146007446,88.2203376523543" />
                          <path d="M414.36698700195456,386.08634898793025 685.1328061674302,123.731927272506" />
                          <path d="M416.02827243735913,388.0377893901757 714.8587368503863,164.43320587287377" />
                          <path d="M417.42637408246776,390.18564895992125 736.4716800768194,209.05938396185547" />
                          <path d="M418.5383351469204,392.49465990241254 749.1728489853367,255.9261803987296" />
                          <path d="M419.3458972607806,394.92690832180983 753.1024235389024,303.1443072227137" />
                          <path d="M419.8358002764649,397.4424567663099 749.906206117421,349.03695820803404" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="hidden gap-20 lg:grid lg:grid-cols-[auto_1fr]">
                    <span className="block pt-[0.2em] font-mono text-caption-20 opacity-50">
                      {"03"}
                    </span>
                    <div className="flex flex-col gap-80">
                      <h3 className="whitespace-pre-line text-headline-10">
                        <span className="">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Execution"}
                              {" "}
                            </span>
                          </span>
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"model"}
                            </span>
                          </span>
                        </span>
                      </h3>
                      <div className="mt-auto hidden w-[70%] overflow-visible lg:block">
                        <svg id="_R_59ejklubtaeivb_" aria-label="Execution model animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 6" style={sx("transform:none")}>
                          <circle cx="400" cy="400" r="399" strokeDasharray="none" />
                          <path d="M420,400 791.1866048151093,399.01096263482395" />
                          <path d="M419.8358002764649,402.5575432336901 780.6968298920123,447.1593767602882" />
                          <path d="M419.3458972607806,405.07309167819017 761.8039252968845,491.63432018558314" />
                          <path d="M418.5383351469204,407.50534009758746 736.3074201265858,531.206741789648" />
                          <path d="M417.42637408246776,409.81435104007875 706.6272750059624,565.5997101268216" />
                          <path d="M416.02827243735913,411.9622106098243 675.0667126383437,595.5224642408109" />
                          <path d="M414.36698700195456,413.91365101206975 642.795329504306,621.8832096243642" />
                          <path d="M412.46979603717466,415.6366296493606 609.9305234865602,645.1456188974779" />
                          <path d="M410.3678513662105,417.10285526010694 576.26053729944,665.4849127551503" />
                          <path d="M408.0956668624479,418.28825246031624 541.4711242278095,682.7600233621934" />
                          <path d="M405.69055173262063,419.1733570607332 505.46412884722395,697.8847576183502" />
                          <path d="M403.19199790066756,419.743635668289 467.6739667208142,710.2141791028523" />
                          <path d="M400.6410315514331,419.98972432401376 427.74305239180427,719.7345913725536" />
                          <path d="M398.0795394818464,419.90758225898395 385.1709557591405,726.6114234765378" />
                          <path d="M395.5495813208737,419.49855824363647 339.48865052959445,730.4558456731755" />
                          <path d="M393.09269891157385,418.7693684409952 290.6896827869567,730.2138315227093" />
                          <path d="M390.7492341951833,417.73198612746 239.96247145315186,723.9279973512186" />
                          <path d="M388.55766679755664,416.40344509193915 189.84826154977026,709.5624268708204" />
                          <path d="M386.55398219477365,414.8055599415063 143.03298255942184,686.4456974167701" />
                          <path d="M384.7710808326173,412.96456790615576 101.66062667766913,655.1280231942478" />
                          <path d="M383.2382379021632,410.910698024211 67.227611482363,616.83060896062" />
                          <path d="M381.98062264195164,408.6776747823512 40.54756009467538,573.1057694573775" />
                          <path d="M381.0188850597866,406.30216436047243 23.42927169738768,525.0843878089768" />
                          <path d="M380.3688168601787,403.82317257402747 15.761518429863163,474.6862610671607" />
                          <path d="M380.0410921449933,401.28140439961425 18.312824044829956,423.4729591713902" />
                          <path d="M380.0410921449933,398.71859560038575 9.325910879328797,374.123947769851" />
                          <path d="M380.3688168601787,396.17682742597253 10.519780698178804,323.82183116756323" />
                          <path d="M381.0188850597866,393.69783563952757 21.36238365758413,274.2764772426905" />
                          <path d="M381.98062264195164,391.3223252176488 42.23641381545899,227.26344967656965" />
                          <path d="M383.2382379021632,389.08930197578906 71.51614141675037,184.23224918984542" />
                          <path d="M384.7710808326173,387.03543209384424 108.61430582899274,146.72775675551446" />
                          <path d="M386.55398219477365,385.1944400584937 152.22010084599776,116.09351675212513" />
                          <path d="M388.5576667975566,383.5965549080609 200.28299623938602,93.16854671066207" />
                          <path d="M390.7492341951833,382.26801387254 250.03620105298856,77.81289099323779" />
                          <path d="M393.09269891157385,381.2306315590048 298.6552832676284,68.69925467886799" />
                          <path d="M395.5495813208737,380.50144175636353 344.66561966588614,64.34464415053222" />
                          <path d="M398.0795394818464,380.09241774101605 387.9097664678167,63.841296071911586" />
                          <path d="M400.6410315514331,380.01027567598624 428.79007045781395,66.78177272804362" />
                          <path d="M403.19199790066756,380.256364331711 467.8255453726263,73.22077484345984" />
                          <path d="M405.69055173262063,380.8266429392668 505.37297428822393,83.10800081082145" />
                          <path d="M408.0956668624479,381.71174753968376 541.9110423977944,95.91198718492603" />
                          <path d="M410.3678513662105,382.89714473989306 577.6823060966096,112.37669208919391" />
                          <path d="M412.46979603717466,384.3633703506394 612.9980561290089,132.43096539327834" />
                          <path d="M414.36698700195456,386.08634898793025 648.1182478835448,156.2875958227462" />
                          <path d="M416.02827243735913,388.0377893901757 683.020421659588,184.41975072642748" />
                          <path d="M417.42637408246776,390.18564895992125 716.6956593984199,217.64504427630865" />
                          <path d="M418.5383351469204,392.49465990241254 746.9671122159209,256.5300159187436" />
                          <path d="M419.3458972607806,394.92690832180983 771.3893474676977,300.7212362746318" />
                          <path d="M419.8358002764649,397.4424567663099 787.9912081632386,348.987129922069" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-24 lg:gap-60">
                  <h3 className="block whitespace-pre-line text-headline-10 lg:hidden">
                    <span className="">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"Execution"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"model"}
                        </span>
                      </span>
                    </span>
                  </h3>
                  <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0]">
                    <div className="empty:hidden" data-text="true">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"Quotes come from the live pools, with"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"Chainlink feeds behind the tokenised"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"stocks. Entries, marks and settlements"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"are all priced server side, so nothing"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"your browser sends can move a balance."}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] mt-auto">
                    <ul className="flex list-none flex-col gap-8">
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Live pool prices"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Chainlink feeds for stocks"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Balances move inside a row lock"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Liquidations swept continuously"}
                            </span>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-80 overflow-visible px-12 py-20 lg:min-h-[calc(50svh-var(--site-header-height))] lg:grid-cols-2 lg:grid-rows-1 lg:gap-60 lg:p-40">
                <div className="flex flex-col gap-24 lg:gap-60">
                  <div className="grid grid-cols-2 gap-20 overflow-visible lg:hidden">
                    <span className="block pt-[0.2em] font-mono text-caption-20 opacity-50">
                      {"04"}
                    </span>
                    <div>
                      <div className="ml-auto max-w-200">
                        <svg id="_R_15ijklubtaeivb_" aria-label="Listing animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" overflow="visible" fill="none" stroke="currentColor" strokeWidth="2" className="h-auto w-full max-w-full overflow-visible">
                          <g style={sx("transform:translateX(-120px) translateY(-120px);transform-origin:50% 50%;transform-box:fill-box")}>
                            <circle cx="400" cy="400" r="330" strokeDasharray="4 7" strokeWidth="4" />
                            <path d="M60,400v20h20v-20z" fill="currentColor" transform="rotate(0 400 400)" />
                          </g>
                          <g>
                            <circle cx="400" cy="400" r="330" />
                            <path d="M380,400v20h20v-20z" fill="currentColor" />
                          </g>
                          <g style={sx("transform:translateX(120px) translateY(120px);transform-origin:50% 50%;transform-box:fill-box")}>
                            <circle cx="400" cy="400" r="330" strokeDasharray="4 7" strokeWidth="4" />
                            <path d="M720,400v20h20v-20z" fill="currentColor" transform="rotate(0 400 400)" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="hidden gap-20 lg:grid lg:grid-cols-[auto_1fr]">
                    <span className="block pt-[0.2em] font-mono text-caption-20 opacity-50">
                      {"04"}
                    </span>
                    <div className="flex flex-col gap-80">
                      <h3 className="whitespace-pre-line text-headline-10">
                        <span className="">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Your"}
                              {" "}
                            </span>
                          </span>
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"listing"}
                            </span>
                          </span>
                        </span>
                      </h3>
                      <div className="mt-auto hidden w-[70%] overflow-visible lg:block">
                        <svg id="_R_59ijklubtaeivb_" aria-label="Listing animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" overflow="visible" fill="none" stroke="currentColor" strokeWidth="2" className="h-auto w-full max-w-full overflow-visible">
                          <g style={sx("transform:none;transform-origin:50% 50%;transform-box:fill-box")}>
                            <circle cx="400" cy="400" r="330" strokeDasharray="4 7" strokeWidth="4" />
                            <path d="M60,400v20h20v-20z" fill="currentColor" transform="rotate(78.33 400 400)" />
                          </g>
                          <g>
                            <circle cx="400" cy="400" r="330" />
                            <path d="M380,400v20h20v-20z" fill="currentColor" />
                          </g>
                          <g style={sx("transform:none;transform-origin:50% 50%;transform-box:fill-box")}>
                            <circle cx="400" cy="400" r="330" strokeDasharray="4 7" strokeWidth="4" />
                            <path d="M720,400v20h20v-20z" fill="currentColor" transform="rotate(78.33 400 400)" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-24 lg:gap-60">
                  <h3 className="block whitespace-pre-line text-headline-10 lg:hidden">
                    <span className="">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"Your"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block")}>
                          {"listing"}
                        </span>
                      </span>
                    </span>
                  </h3>
                  <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0]">
                    <div className="empty:hidden" data-text="true">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"Any token with a live pool can be a"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"market here. You pay the listing fee and"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"post the liquidity that backs payouts,"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"so your pair can never owe more than the"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"pool you funded holds."}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] mt-auto">
                    <ul className="flex list-none flex-col gap-8">
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"0.05 ETH listing fee"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"0.05 ETH minimum liquidity"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"This chain or Solana, incl. pump.fun"}
                            </span>
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-8 font-mono text-caption-20 uppercase">
                        <span className="mt-[0.15lvh] block size-8 shrink-0 bg-mint">
                        </span>
                        <div className="min-w-0 flex-1" data-text="true">
                          <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                            <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                              {"Or launch a new token here"}
                            </span>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="clients" data-page-builder-section="clientsSection" className="scroll-mt-(--site-header-height) overflow-clip">
          <div className="grid grid-cols-1 lg:min-h-[65svh] lg:grid-cols-2 lg:divide-x">
            <div className="relative z-1 order-2 flex flex-col gap-48 border-t bg-theme-bg px-12 py-20 text-theme-fg lg:order-1 lg:px-20 lg:py-0">
              <div className="block lg:hidden">
                <div className="flex items-center gap-12">
                  <span className="block size-8 shrink-0 bg-black">
                  </span>
                  <p className="font-mono text-caption-10 uppercase">
                    {"How it works"}
                  </p>
                </div>
              </div>
              <h2 className="w-fit py-20 text-headline-50 lg:sticky lg:top-(--site-header-height)">
                <span className="">
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"Steps"}
                    </span>
                  </span>
                </span>
              </h2>
              <div className="block lg:hidden">
                <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0]">
                  <div className="empty:hidden" data-text="true">
                    <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                      <span className="line" style={sx("display:block")}>
                        {"Five steps from a wallet to an open position. Connect, deposit ETH to the treasury, and your desk balance is credited once the transfer is read back off the chain. Pick a market, post margin or buy a premium, and close whenever you like. Withdrawals go back to the same wallet."}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-140 ml-auto block lg:hidden">
                <a href="/trade" draggable="false" className="relative isolate inline-flex w-fit items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-fg text-theme-bg before:bg-mint hover:text-black motion-reduce:hover:bg-mint motion-reduce:hover:text-black motion-reduce:before:hidden h-36 px-12 font-mono text-caption-10 uppercase before:origin-left min-w-200 shrink-0 lg:ml-0">
                  <span data-inner="true" className="relative z-10 flex w-full min-w-0 flex-row items-center justify-between gap-8">
                    {"Start trading"}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0">
                      <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            <div className="relative order-1 aspect-square border-t lg:order-2 lg:aspect-auto">
              <div className="vt-exclude size-full absolute inset-0">
                <div className="size-full">
                  <div className="relative z-0 size-full select-none" style={sx("position:relative;width:100%;height:100%;overflow:hidden;pointer-events:auto;background-color:rgb(224, 224, 224)")}>
                    <div style={sx("width:100%;height:100%")}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-1 grid grid-cols-1 border-t bg-theme-bg lg:grid-cols-2 lg:divide-x">
            <div className="hidden grid-cols-2 divide-x self-start lg:sticky lg:top-(--site-header-height) lg:grid lg:h-[calc(100svh-var(--site-header-height))]">
              <div className="grid grid-rows-2 divide-y">
                <div className="flex flex-col p-20">
                  <div className="flex items-center gap-12">
                    <span className="block size-8 shrink-0 bg-black">
                    </span>
                    <p className="font-mono text-caption-10 uppercase">
                      {"How it works"}
                    </p>
                  </div>
                  <div className="mt-auto flex items-end justify-between gap-12">
                    <p className="relative overflow-hidden font-mono text-caption-10 uppercase" style={sx("height:1em;line-height:1em")}>
                      <span className="sr-only">
                        {"Withdraw"}
                      </span>
                      <span aria-hidden="true" className="flex flex-col" style={sx("transform:translateY(-5em)")}>
                        <span className="block whitespace-nowrap" style={sx("height:1em;line-height:1em")}>
                          {"Connect"}
                        </span>
                        <span className="block whitespace-nowrap" style={sx("height:1em;line-height:1em")}>
                          {"Deposit"}
                        </span>
                        <span className="block whitespace-nowrap" style={sx("height:1em;line-height:1em")}>
                          {"Trade"}
                        </span>
                        <span className="block whitespace-nowrap" style={sx("height:1em;line-height:1em")}>
                          {"Close"}
                        </span>
                        <span className="block whitespace-nowrap" style={sx("height:1em;line-height:1em")}>
                          {"Withdraw"}
                        </span>
                      </span>
                    </p>
                    <div className="flex items-center gap-[1ch] font-mono text-caption-10 tabular-nums opacity-50">
                      <span>
                        <span>
                          <span className="sr-only">
                            {"05"}
                          </span>
                          <span aria-hidden="true" className="flex items-center">
                            <span className="relative inline-block overflow-hidden align-baseline" style={sx("height:1em;line-height:1em")}>
                              <span className="invisible">
                                {"0"}
                              </span>
                              <span className="absolute inset-x-0 top-0 flex flex-col" style={sx("transform:none")}>
                                <span className="block" style={sx("height:1em;line-height:1em")}>
                                  {"0"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"1"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"2"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"3"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"4"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"5"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"6"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"7"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"8"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"9"}
                                </span>
                              </span>
                            </span>
                            <span className="relative inline-block overflow-hidden align-baseline" style={sx("height:1em;line-height:1em")}>
                              <span className="invisible">
                                {"6"}
                              </span>
                              <span className="absolute inset-x-0 top-0 flex flex-col" style={sx("transform:translateY(-6em)")}>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"0"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"1"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"2"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"3"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"4"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"5"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")}>
                                  {"6"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"7"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"8"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"9"}
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span aria-hidden="true">
                        {"-"}
                      </span>
                      <span>
                        {"05"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 flex flex-col" style={sx("height:500%;transform:translateY(-80%)")}>
                    <div className="flex items-center justify-center" style={sx("height:20%;background-color:#191919")}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Sign in" className="max-w-full size-full object-contain" style={sx("width:200px;height:200px")}>
                        <circle cx="100" cy="100" r="56" fill="none" stroke="#a1ffcb" strokeWidth="12" />
                        <circle cx="100" cy="100" r="18" fill="#a1ffcb" />
                      </svg>
                    </div>
                    <div className="flex items-center justify-center" style={sx("height:20%;background-color:#2f4438")}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Pay the fee" className="max-w-full size-full object-contain" style={sx("width:200px;height:200px")}>
                        <rect x="86" y="60" width="28" height="80" fill="#a1ffcb" />
                      </svg>
                    </div>
                    <div className="flex items-center justify-center" style={sx("height:20%;background-color:#456f52")}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Trade" className="max-w-full size-full object-contain" style={sx("width:200px;height:200px")}>
                        <rect x="60" y="60" width="28" height="80" fill="#a1ffcb" />
                        <rect x="112" y="60" width="28" height="80" fill="#a1ffcb" />
                      </svg>
                    </div>
                    <div className="flex items-center justify-center" style={sx("height:20%;background-color:#79cc9b")}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Clear both stages" className="max-w-full size-full object-contain" style={sx("width:200px;height:200px")}>
                        <path d="m52 104 32 32 64-72" fill="none" stroke="#191919" strokeWidth="16" />
                      </svg>
                    </div>
                    <div className="flex items-center justify-center" style={sx("height:20%;background-color:#a1ffcb")}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Funded" className="max-w-full size-full object-contain" style={sx("width:200px;height:200px")}>
                        <path d="M44 156h32v-44H44zM84 156h32V88H84zM124 156h32V64h-32z" fill="#191919" />
                        <path d="M52 76 148 40" fill="none" stroke="#191919" strokeWidth="12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="sticky top-(--site-header-height) flex flex-col gap-60 p-20">
                  <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] text-body-10">
                    <div className="empty:hidden" data-text="true">
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"Five steps from a wallet to an open"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"position. Connect, deposit ETH, and your"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"desk balance is credited once the transfer"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"is read back off the chain. Pick a market,"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"post margin or pay a premium, and close it"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"whenever you like. Withdrawals go back to"}
                          {" "}
                        </span>
                      </span>
                      <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                        <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                          {"the same wallet."}
                        </span>
                      </span>
                    </div>
                  </div>
                  <a href="/trade" draggable="false" className="relative isolate inline-flex w-fit items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-fg text-theme-bg before:bg-mint hover:text-black motion-reduce:hover:bg-mint motion-reduce:hover:text-black motion-reduce:before:hidden h-36 px-12 font-mono text-caption-10 uppercase before:origin-left ml-auto min-w-200 shrink-0 lg:ml-0">
                    <span data-inner="true" className="relative z-10 flex w-full min-w-0 flex-row items-center justify-between gap-8">
                      {"Start trading"}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0">
                        <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <ul aria-label="How it works" className="divide-y">
              <li>
                <button type="button" className="relative isolate grid h-100 w-full grid-cols-2 items-end gap-20 overflow-hidden p-12 lg:h-120 transition-colors duration-800 ease-out motion-reduce:transition-none text-theme-fg">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 origin-top bg-theme-fg transition-transform duration-800 ease-out motion-reduce:transition-none scale-y-0">
                  </span>
                  <h3 className="text-headline-10">
                    {"Connect"}
                  </h3>
                  <span className="ml-auto font-mono text-caption-10 uppercase opacity-60 lg:ml-0">
                    {"Any EVM wallet, picked by you"}
                  </span>
                </button>
              </li>
              <li>
                <button type="button" className="relative isolate grid h-100 w-full grid-cols-2 items-end gap-20 overflow-hidden p-12 lg:h-120 transition-colors duration-800 ease-out motion-reduce:transition-none text-theme-fg">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 origin-top bg-theme-fg transition-transform duration-800 ease-out motion-reduce:transition-none scale-y-0">
                  </span>
                  <h3 className="text-headline-10">
                    {"Deposit"}
                  </h3>
                  <span className="ml-auto font-mono text-caption-10 uppercase opacity-60 lg:ml-0">
                    {"ETH to the treasury, credited on chain"}
                  </span>
                </button>
              </li>
              <li>
                <button type="button" className="relative isolate grid h-100 w-full grid-cols-2 items-end gap-20 overflow-hidden p-12 lg:h-120 transition-colors duration-800 ease-out motion-reduce:transition-none text-theme-fg">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 origin-top bg-theme-fg transition-transform duration-800 ease-out motion-reduce:transition-none scale-y-0">
                  </span>
                  <h3 className="text-headline-10">
                    {"Trade"}
                  </h3>
                  <span className="ml-auto font-mono text-caption-10 uppercase opacity-60 lg:ml-0">
                    {"Perps to 5x, or calls and puts"}
                  </span>
                </button>
              </li>
              <li>
                <button type="button" className="relative isolate grid h-100 w-full grid-cols-2 items-end gap-20 overflow-hidden p-12 lg:h-120 transition-colors duration-800 ease-out motion-reduce:transition-none text-theme-fg">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 origin-top bg-theme-fg transition-transform duration-800 ease-out motion-reduce:transition-none scale-y-0">
                  </span>
                  <h3 className="text-headline-10">
                    {"Close"}
                  </h3>
                  <span className="ml-auto font-mono text-caption-10 uppercase opacity-60 lg:ml-0">
                    {"Any time, at the live mark"}
                  </span>
                </button>
              </li>
              <li>
                <button type="button" className="relative isolate grid h-100 w-full grid-cols-2 items-end gap-20 overflow-hidden p-12 lg:h-120 transition-colors duration-800 ease-out motion-reduce:transition-none text-theme-bg">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 origin-top bg-theme-fg transition-transform duration-800 ease-out motion-reduce:transition-none scale-y-100">
                  </span>
                  <h3 className="text-headline-10">
                    {"Withdraw"}
                  </h3>
                  <span className="ml-auto font-mono text-caption-10 uppercase opacity-60 lg:ml-0">
                    {"Back to the wallet you came with"}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div id="testimonials" data-page-builder-section="testimonialSection" className="scroll-mt-(--site-header-height)">
          <div>
            <div className="relative z-1 min-h-[calc(100svh-var(--site-header-height))] flex-col border-t bg-theme-bg flex lg:hidden">
              <div className="flex flex-1 flex-col px-12 py-24">
                <div className="mb-48 flex items-center justify-between">
                  <div className="flex items-center gap-12">
                    <span className="block size-8 shrink-0 bg-black">
                    </span>
                    <p className="font-mono text-caption-10 uppercase">
                      {"Verified"}
                    </p>
                  </div>
                  <div className="flex items-center gap-[1ch] font-mono text-caption-10 tabular-nums opacity-50">
                    <span>
                      <span>
                        <span className="sr-only">
                          {"01"}
                        </span>
                        <span aria-hidden="true" className="flex items-center">
                          <span className="relative inline-block overflow-hidden align-baseline" style={sx("height:1em;line-height:1em")}>
                            <span className="invisible">
                              {"0"}
                            </span>
                            <span className="absolute inset-x-0 top-0 flex flex-col" style={sx("transform:none")}>
                              <span className="block" style={sx("height:1em;line-height:1em")}>
                                {"0"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"1"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"2"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"3"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"4"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"5"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"6"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"7"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"8"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"9"}
                              </span>
                            </span>
                          </span>
                          <span className="relative inline-block overflow-hidden align-baseline" style={sx("height:1em;line-height:1em")}>
                            <span className="invisible">
                              {"1"}
                            </span>
                            <span className="absolute inset-x-0 top-0 flex flex-col" style={sx("transform:translateY(-1em)")}>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"0"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")}>
                                {"1"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"2"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"3"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"4"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"5"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"6"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"7"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"8"}
                              </span>
                              <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                {"9"}
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span aria-hidden="true">
                      {"-"}
                    </span>
                    <span>
                      {"01"}
                    </span>
                  </div>
                </div>
                <div className="mb-64">
                  <div className="contents">
                    <div className="mb-24" style={sx("opacity:1")}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 12" aria-hidden="true" className="size-[1em] shrink-0 h-auto w-14">
                        <path fill="currentColor" d="M2.982 6.216H5.25v5.25H0V5.838L2.73 0h2.688zm7.392 0h2.268v5.25h-5.25V5.838L10.122 0h2.688z" />
                      </svg>
                    </div>
                    <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] text-headline-10">
                      <div className="empty:hidden" data-text="true">
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block")}>
                            {"Every number that moves a balance is fetched on the server. The browser asks for a side and a size, nothing more. Entry, mark and settlement prices come from the pools, and each balance change runs inside a database row lock that refuses to go negative."}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between gap-20">
                  <div className="flex flex-col gap-8" style={sx("opacity:1;transform:none")}>
                    <p>
                      {"lib/engine/prices.js"}
                    </p>
                    <p className="font-mono text-caption-10 uppercase opacity-50">
                      {"The pricing engine, verbatim"}
                    </p>
                  </div>
                  <div className="relative overflow-hidden aspect-square w-100">
                    <div className="absolute inset-0" style={sx("clip-path:inset(0px)")}>
                      <div className="relative size-full" style={sx("will-change:transform;transform:translate3d(0px, 0px, 0px) scale(1);transform-origin:left center")}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={sx("width:calc(109%);height:calc(109%)")}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" role="img" aria-label="Equity stepping up through the stage targets" className="max-w-full size-full">
                            <rect width="600" height="600" fill="#a1ffcb" />
                            <path fill="#191919" d="M96 396h96v108H96zM252 300h96v204h-96zM408 204h96v300h-96z" />
                            <path fill="none" stroke="#191919" strokeWidth="24" d="M120 264 288 156l72 48 156-108" />
                            <path fill="#191919" d="M528 60v120H408z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-20 bg-theme-fg p-20 text-theme-bg">
                <div className="flex flex-col gap-8" style={sx("opacity:1;transform:none")}>
                  <p className="font-medium text-caption-20">
                    {"Network"}
                  </p>
                  <p className="font-mono text-caption-10 uppercase opacity-60">
                    {"Robinhood Chain, 4663"}
                  </p>
                </div>
                <div className="flex flex-col gap-8" style={sx("opacity:1;transform:none")}>
                  <p className="font-medium text-caption-20">
                    {"Settlement"}
                  </p>
                  <p className="font-mono text-caption-10 uppercase opacity-60">
                    {"ETH, cash settled"}
                  </p>
                </div>
              </div>
              <div className="relative grid grid-cols-2">
                <button type="button" className="relative isolate min-w-0 shrink-0 items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-bg text-theme-fg before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg motion-reduce:hover:text-theme-bg motion-reduce:before:hidden h-60 px-20 text-body-10 before:origin-right flex w-full justify-center" aria-label="Previous testimonial">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0 pointer-events-none relative z-1">
                    <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M15.203 7.977H1.06m7.072 7.07L1.06 7.978 8.132.906" />
                  </svg>
                </button>
                <button type="button" className="relative isolate min-w-0 shrink-0 items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-bg text-theme-fg before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg motion-reduce:hover:text-theme-bg motion-reduce:before:hidden h-60 px-20 text-body-10 before:origin-left flex w-full justify-center border-l" aria-label="Next testimonial">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0 pointer-events-none relative z-1">
                    <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
                  </svg>
                </button>
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-1 h-4 origin-left bg-theme-fg" style={sx("transform:scaleX(0.24325)")}>
                </div>
              </div>
            </div>
            <div className="min-h-[calc(100svh-var(--site-header-height))] grid-cols-4 divide-x hidden lg:grid">
              <div className="relative z-1 grid grid-rows-2 divide-y border-t bg-theme-bg">
                <div className="flex flex-col divide-y">
                  <div className="flex-1 p-20">
                    <div className="flex items-center gap-12">
                      <span className="block size-8 shrink-0 bg-black">
                      </span>
                      <p className="font-mono text-caption-10 uppercase">
                        {"Verified"}
                      </p>
                    </div>
                  </div>
                  <div className="relative grid grid-cols-2">
                    <button type="button" className="relative isolate min-w-0 shrink-0 items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-bg text-theme-fg before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg motion-reduce:hover:text-theme-bg motion-reduce:before:hidden h-60 px-20 text-body-10 before:origin-right flex w-full justify-center" aria-label="Previous testimonial">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0 pointer-events-none relative z-1">
                        <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M15.203 7.977H1.06m7.072 7.07L1.06 7.978 8.132.906" />
                      </svg>
                    </button>
                    <button type="button" className="relative isolate min-w-0 shrink-0 items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-bg text-theme-fg before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg motion-reduce:hover:text-theme-bg motion-reduce:before:hidden h-60 px-20 text-body-10 before:origin-left flex w-full justify-center border-l" aria-label="Next testimonial">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0 pointer-events-none relative z-1">
                        <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
                      </svg>
                    </button>
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-1 h-4 origin-left bg-theme-fg" style={sx("transform:scaleX(0.24325)")}>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0" style={sx("clip-path:inset(0px)")}>
                    <div className="relative size-full" style={sx("will-change:transform;transform:translate3d(0px, 0px, 0px) scale(1);transform-origin:left center")}>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={sx("width:calc(109%);height:calc(109%)")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" role="img" aria-label="Equity stepping up through the stage targets" className="max-w-full size-full">
                          <rect width="600" height="600" fill="#a1ffcb" />
                          <path fill="#191919" d="M96 396h96v108H96zM252 300h96v204h-96zM408 204h96v300h-96z" />
                          <path fill="none" stroke="#191919" strokeWidth="24" d="M120 264 288 156l72 48 156-108" />
                          <path fill="#191919" d="M528 60v120H408z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative z-1 col-span-2 overflow-hidden border-t bg-theme-bg">
                <div className="flex h-full flex-col gap-48 p-20">
                  <div className="contents">
                    <div style={sx("opacity:1")}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 12" aria-hidden="true" className="size-[1em] shrink-0 h-auto w-14">
                        <path fill="currentColor" d="M2.982 6.216H5.25v5.25H0V5.838L2.73 0h2.688zm7.392 0h2.268v5.25h-5.25V5.838L10.122 0h2.688z" />
                      </svg>
                    </div>
                    <div className="flex w-full flex-col gap-[1em] [&_[data-text]>*:not(:first-child)]:[text-indent:0] text-headline-10">
                      <div className="empty:hidden" data-text="true">
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"Every number that moves a balance is"}
                            {" "}
                          </span>
                        </span>
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"fetched on the server. The browser asks"}
                            {" "}
                          </span>
                        </span>
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"for a side and a size, nothing more."}
                            {" "}
                          </span>
                        </span>
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"Entry, mark and settlement prices come"}
                            {" "}
                          </span>
                        </span>
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"from the pools, and every balance change"}
                            {" "}
                          </span>
                        </span>
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"runs inside a row lock that refuses to"}
                            {" "}
                          </span>
                        </span>
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"go negative. The market is real, and so"}
                            {" "}
                          </span>
                        </span>
                        <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                          <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                            {"is the money behind it."}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col gap-8" style={sx("opacity:1;transform:none")}>
                      <p>
                        {"lib/engine/prices.js"}
                      </p>
                      <p className="font-mono text-caption-10 uppercase opacity-50">
                        {"The pricing engine, verbatim"}
                      </p>
                    </div>
                    <div className="flex items-center gap-[1ch] font-mono text-caption-10 tabular-nums opacity-50">
                      <span>
                        <span>
                          <span className="sr-only">
                            {"01"}
                          </span>
                          <span aria-hidden="true" className="flex items-center">
                            <span className="relative inline-block overflow-hidden align-baseline" style={sx("height:1em;line-height:1em")}>
                              <span className="invisible">
                                {"0"}
                              </span>
                              <span className="absolute inset-x-0 top-0 flex flex-col" style={sx("transform:none")}>
                                <span className="block" style={sx("height:1em;line-height:1em")}>
                                  {"0"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"1"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"2"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"3"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"4"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"5"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"6"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"7"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"8"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"9"}
                                </span>
                              </span>
                            </span>
                            <span className="relative inline-block overflow-hidden align-baseline" style={sx("height:1em;line-height:1em")}>
                              <span className="invisible">
                                {"1"}
                              </span>
                              <span className="absolute inset-x-0 top-0 flex flex-col" style={sx("transform:translateY(-1em)")}>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"0"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")}>
                                  {"1"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"2"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"3"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"4"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"5"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"6"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"7"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"8"}
                                </span>
                                <span className="block" style={sx("height:1em;line-height:1em")} aria-hidden="true">
                                  {"9"}
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span aria-hidden="true">
                        {"-"}
                      </span>
                      <span>
                        {"03"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-rows-2 items-start border-t">
                <div className="sticky top-(--site-header-height) z-1 h-full overflow-hidden bg-theme-fg text-theme-bg">
                  <div className="flex h-full flex-col gap-20 p-20">
                    <div className="flex flex-col gap-8" style={sx("opacity:1;transform:none")}>
                      <p className="font-medium text-caption-20">
                        {"Network"}
                      </p>
                      <p className="font-mono text-caption-10 uppercase opacity-60">
                        {"Robinhood Chain, 4663"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-8" style={sx("opacity:1;transform:none")}>
                      <p className="font-medium text-caption-20">
                        {"Settlement"}
                      </p>
                      <p className="font-mono text-caption-10 uppercase opacity-60">
                        {"ETH, cash settled"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full overflow-hidden">
                  <div className="vt-exclude size-full absolute inset-0">
                    <div className="size-full">
                      <div className="relative z-0 size-full select-none" style={sx("position:relative;width:100%;height:100%;overflow:hidden;pointer-events:auto;background-color:rgb(224, 224, 224)")}>
                        <div style={sx("width:100%;height:100%")}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="start" data-page-builder-section="bannerSection" className="@container relative flex min-h-[calc(100svh-var(--site-header-height))] scroll-mt-(--site-header-height) flex-col items-center justify-center overflow-clip py-20" style={sx("margin-top:0;padding-top:5rem;min-height:calc(100svh - var(--site-header-height))")}>
          <div className="vt-exclude size-full absolute inset-0">
            <div className="size-full">
              <div className="relative z-0 size-full select-none" style={sx("position:relative;width:100%;height:100%;overflow:hidden;pointer-events:auto;background-color:rgb(224, 224, 224)")}>
                <div style={sx("width:100%;height:100%")}>
                </div>
              </div>
            </div>
          </div>
          <p className="sr-only">
            {"Trade it, or list it yourself"}
          </p>
          <div className="relative z-1 flex w-full items-start text-[8.62cqw] text-white uppercase leading-[0.9]">
            <span className="block shrink-0 bg-black p-[0.4cqw]" aria-hidden="true">
              <span className="relative inline-block overflow-clip">
                <span className="block" style={sx("transform:none")}>
                  {"Trade"}
                </span>
              </span>
            </span>
            <div className="flex flex-1 flex-col">
              <span className="ml-[15cqw] block w-fit shrink-0 bg-black p-[0.4cqw]" aria-hidden="true">
                <span className="relative inline-block overflow-clip">
                  <span className="block" style={sx("transform:none")}>
                    {"it, or list"}
                  </span>
                </span>
              </span>
              <div className="flex items-stretch justify-between">
                <span className="block w-fit shrink-0 bg-white p-[0.4cqw] text-black" aria-hidden="true">
                  <span className="relative inline-block overflow-clip">
                    <span className="block" style={sx("transform:none")}>
                      {"it yourself."}
                    </span>
                  </span>
                </span>
                <a href="/trade" draggable="false" className="relative isolate inline-flex min-w-0 shrink-0 items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-mint text-black before:bg-black hover:text-mint motion-reduce:hover:bg-black motion-reduce:hover:text-mint motion-reduce:before:hidden font-mono uppercase before:origin-left size-[calc(0.9em+0.8cqw)] px-0 text-[length:inherit] **:data-inner:justify-center" aria-label="Start trading">
                  <span data-inner="true" className="relative z-10 flex w-full min-w-0 flex-row items-center justify-between gap-8">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0 size-[3.5cqw]!">
                      <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            <span className="block shrink-0 bg-black p-[0.4cqw]" aria-hidden="true">
              <span className="relative inline-block overflow-clip">
                <span className="block" style={sx("transform:none")}>
                  {"in ETH"}
                </span>
              </span>
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
