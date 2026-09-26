import { sx, onImgError, onImgErrorHide } from '../../lib/dom';

export function footer_0() {
  return (
    <>
      <footer className="relative z-1 divide-y overflow-clip border-t bg-theme-bg lg:grid lg:h-[calc(100svh-var(--site-header-height))] lg:grid-rows-2">
        <div className="relative z-1 grid grid-cols-1 divide-y lg:grid-cols-2 lg:divide-x lg:divide-y-0 lg:bg-theme-bg">
          <div className="min-h-200 px-12 py-20 lg:px-20">
            <p className="w-fit whitespace-pre-line text-headline-10">
              <span className="">
                <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                  <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                    {"Real prices."}
                    {" "}
                  </span>
                </span>
                <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                  <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                    {"Real payouts."}
                  </span>
                </span>
              </span>
            </p>
          </div>
          <div className="flex min-h-200 flex-col divide-y">
            <div className="grid flex-1 grid-cols-1 divide-y lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              <div className="px-12 py-20 lg:px-20">
                <ul className="flex flex-col gap-8">
                  <li>
                    <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/trade">
                      <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                      </span>
                      <span className="relative">
                        {"Perpetuals"}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/trade/options">
                      <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                      </span>
                      <span className="relative">
                        {"Options"}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/list-token">
                      <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                      </span>
                      <span className="relative">
                        {"List a token"}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/portfolio">
                      <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                      </span>
                      <span className="relative">
                        {"Portfolio"}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex-1 px-12 py-20 lg:px-20">
                <div className="flex flex-col gap-20">
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-caption-10 uppercase opacity-50">
                      {"Markets"}
                    </span>
                    <span className="text-body-10 tabular-nums">
                      {"..."}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-caption-10 uppercase opacity-50">
                      {"Listed"}
                    </span>
                    <span className="text-body-10 tabular-nums">
                      {"..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 divide-y lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              <a className="relative isolate inline-flex min-w-0 shrink-0 items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-bg text-theme-fg before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg motion-reduce:hover:text-theme-bg motion-reduce:before:hidden before:origin-left h-60 w-full px-12 font-sans text-body-10 normal-case lg:px-20" href="/trade">
                <span data-inner="true" className="relative z-10 flex w-full min-w-0 flex-row items-center justify-between gap-8">
                  {"Open the desk"}
                </span>
              </a>
              <ul className="flex divide-x">
                <li className="w-full">
                  <a target="_blank" rel="noopener noreferrer" className="relative isolate inline-flex min-w-0 shrink-0 items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-bg text-theme-fg before:bg-theme-fg hover:text-theme-bg motion-reduce:hover:bg-theme-fg motion-reduce:hover:text-theme-bg motion-reduce:before:hidden before:origin-left h-60 w-full px-12 font-sans text-body-10 normal-case lg:px-20" href="https://x.com/MerpsOrg" aria-label="MERPS on X">
                    <span data-inner="true" className="relative z-10 flex w-full min-w-0 flex-row items-center justify-between gap-8">
                      <span className="flex items-center gap-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" className="block shrink-0 text-current">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        {"@MerpsOrg"}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12" aria-hidden="true" className="shrink-0 size-10">
                        <path stroke="currentColor" strokeWidth="1.5" d="m.53 10.75 10-10m-10 0h10v10" />
                      </svg>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:sticky lg:bottom-0 lg:grid-cols-2 lg:divide-x">
          <div className="order-2 flex min-h-200 flex-col gap-y-48 bg-theme-fg px-12 pt-48 pb-24 text-theme-bg lg:order-1 lg:p-20">
            <span className="contents">
              <span className="m-auto flex w-[60%] flex-col items-center lg:w-full lg:max-w-400" style={sx("gap:calc(var(--spacing) * 10)")}>
                <span role="img" aria-label="MERPS" style={sx("display:block;aspect-ratio:1201 / 751;background-color:currentColor;-webkit-mask-image:url(/logo.png);mask-image:url(/logo.png);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-position:center;mask-position:center;width:40%")}>
                </span>
                <span style={sx("font-size:clamp(2.5rem, 11cqw, 6.5rem);line-height:1;letter-spacing:-0.03em;font-weight:450")}>
                  {"merps"}
                </span>
              </span>
            </span>
            <div className="flex flex-col items-center gap-x-20 gap-y-8 font-mono text-caption-10 uppercase lg:flex-row lg:justify-between">
              <div className="flex flex-wrap items-center">
                <p className="whitespace-nowrap text-theme-bg/65">
                  {"\u00a9 2026 "}
                  {"MERPS"}
                </p>
              </div>
              <p className="text-theme-bg/65">
                {"Built on"}
                {" "}
                <a className="text-theme-bg underline" target="_blank" rel="noreferrer" href="https://robinhoodchain.blockscout.com">
                  {"Robinhood Chain"}
                </a>
              </p>
            </div>
          </div>
          <a href="/trade" draggable="false" className="group relative order-1 aspect-square min-h-200 overflow-hidden lg:order-2 lg:aspect-auto">
            <div className="absolute inset-0 flex flex-col justify-between bg-mint px-12 py-20 text-black transition-[clip-path] duration-800 ease-[var(--ease-in-out)] [clip-path:inset(0_0_0_0)] group-hover:[clip-path:inset(0_0_0_100%)]">
              <p className="whitespace-pre-line text-headline-10">
                <span className="">
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"Ready to"}
                      {" "}
                    </span>
                  </span>
                  <span data-animated-text-mask="" style={sx("display:block;overflow:clip;overflow-clip-margin:0.15em")}>
                    <span className="line" style={sx("display:block;transform:none;opacity:1")}>
                      {"trade?"}
                    </span>
                  </span>
                </span>
              </p>
              <div className="flex items-end justify-between gap-20">
                <p className="leading-none">
                  {"Open the desk"}
                </p>
                <svg aria-hidden="true" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-114 shrink-0">
                  <path d="m.354 114.5 114-114M.354.5h114v114" stroke="currentColor" />
                </svg>
              </div>
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-theme-fg px-12 py-20 text-theme-bg transition-[clip-path] duration-800 ease-[var(--ease-in-out)] [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]">
              <p className="whitespace-pre-line text-headline-10">
                {"Ready to trade?"}
              </p>
              <div className="flex items-end justify-between gap-20">
                <p className="leading-none">
                  {"Open the desk"}
                </p>
                <svg aria-hidden="true" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-114 shrink-0">
                  <path d="m.354 114.5 114-114M.354.5h114v114" stroke="currentColor" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </footer>
    </>
  );
}
