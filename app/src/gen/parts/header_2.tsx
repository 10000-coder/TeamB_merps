import { sx, onImgError, onImgErrorHide } from '../../lib/dom';
import { toggleTheme, toggleMenu } from '../../lib/ui';

export function header_2() {
  return (
    <>
      <header className="sticky inset-x-0 top-0 z-2 grid min-h-(--site-header-height) grid-cols-2 border-b bg-theme-bg">
        <div className="flex items-center border-r">
          <a aria-label="MERPS home" className="flex size-(--site-header-height) shrink-0 items-center justify-center bg-theme-fg text-theme-bg" href="/">
            <span className="contents">
              <div className="perspective-[1000px]">
                <div className="vt-exclude transform-3d origin-center" style={sx("transform:translateZ(1px) rotateY(380.764deg)")}>
                  <span role="img" aria-label="MERPS" className="h-auto" style={sx("display:block;aspect-ratio:1201 / 751;background-color:currentColor;-webkit-mask-image:url(/logo.png);mask-image:url(/logo.png);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-position:center;mask-position:center;width:42px")}>
                  </span>
                </div>
              </div>
            </span>
          </a>
          <div className="hidden lg:block xl:hidden">
            <ul className="flex flex-wrap gap-8 px-20">
              <li>
                <span className="inline-flex overflow-hidden">
                  <span className="inline-flex" style={sx("transform:none")}>
                    <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/trade">
                      <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                      </span>
                      <span className="relative">
                        {"Perpetuals"}
                      </span>
                    </a>
                  </span>
                </span>
              </li>
              <li>
                <span className="inline-flex overflow-hidden">
                  <span className="inline-flex" style={sx("transform:none")}>
                    <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/trade/options">
                      <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                      </span>
                      <span className="relative">
                        {"Options"}
                      </span>
                    </a>
                  </span>
                </span>
              </li>
              <li>
                <span className="inline-flex overflow-hidden">
                  <span className="inline-flex" style={sx("transform:none")}>
                    <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/list-token">
                      <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                      </span>
                      <span className="relative">
                        {"List a token"}
                      </span>
                    </a>
                  </span>
                </span>
              </li>
              <li>
                <span className="inline-flex overflow-hidden">
                  <span className="inline-flex" style={sx("transform:none")}>
                    <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/portfolio">
                      <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                      </span>
                      <span className="relative">
                        {"Portfolio"}
                      </span>
                    </a>
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <div className="mx-auto block px-20 lg:mx-0 lg:hidden lg:pl-80 xl:block">
            <span className="tabular-nums text-caption-20">
              <span>
                <span className="opacity-50">
                  {"Markets"}
                  {" "}
                </span>
                {"..."}
              </span>
              <span>
                <span className="opacity-50">
                  {"  \u00b7  "}
                </span>
                <span className="opacity-50">
                  {"Listed"}
                  {" "}
                </span>
                {"..."}
              </span>
            </span>
          </div>
        </div>
        <div className="hidden items-center lg:flex">
          <div className="flex flex-1 items-center justify-between gap-20 px-20">
            <div className="lg:hidden xl:block">
              <ul className="flex flex-wrap gap-8">
                <li>
                  <span className="inline-flex overflow-hidden">
                    <span className="inline-flex" style={sx("transform:none")}>
                      <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/trade">
                        <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                        </span>
                        <span className="relative">
                          {"Perpetuals"}
                        </span>
                      </a>
                    </span>
                  </span>
                </li>
                <li>
                  <span className="inline-flex overflow-hidden">
                    <span className="inline-flex" style={sx("transform:none")}>
                      <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/trade/options">
                        <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                        </span>
                        <span className="relative">
                          {"Options"}
                        </span>
                      </a>
                    </span>
                  </span>
                </li>
                <li>
                  <span className="inline-flex overflow-hidden">
                    <span className="inline-flex" style={sx("transform:none")}>
                      <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/list-token">
                        <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                        </span>
                        <span className="relative">
                          {"List a token"}
                        </span>
                      </a>
                    </span>
                  </span>
                </li>
                <li>
                  <span className="inline-flex overflow-hidden">
                    <span className="inline-flex" style={sx("transform:none")}>
                      <a draggable="false" className="group relative inline-flex overflow-hidden p-4 text-theme-fg transition-colors duration-600 ease-out hover:text-theme-bg motion-reduce:transition-none" href="/portfolio">
                        <span aria-hidden="true" className="transform-[translate(0,calc(100%+1px))] motion-reduce:group-hover:transform-[translate(0,0)] pointer-events-none absolute inset-0 bg-theme-fg">
                        </span>
                        <span className="relative">
                          {"Portfolio"}
                        </span>
                      </a>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <a href="https://x.com/MerpsOrg" target="_blank" rel="noopener noreferrer" aria-label="MERPS on X" title="MERPS on X" className="group flex items-center justify-center px-12 transition-transform duration-200 ease-out active:scale-[0.94] ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" className="block shrink-0 text-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <button type="button" aria-label="Toggle theme" title="Toggle theme" className="group flex items-center justify-center px-12 transition-transform duration-200 ease-out active:scale-[0.94]" onClick={toggleTheme}>
              <svg className="block text-current motion-safe:transition-transform motion-safe:duration-[450ms] motion-safe:ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-safe:group-hover:rotate-180" viewBox="0 0 24 12" width="24" height="12" aria-hidden="true">
                <title>
                  {"Theme"}
                </title>
                <circle cx="6.5" cy="6" r="5.5" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="17.5" cy="6" r="5.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </div>
          <a href="/trade" draggable="false" className="relative isolate inline-flex w-fit items-center overflow-hidden whitespace-nowrap transition-[transform,color] duration-800 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:h-full before:w-full before:scale-x-0 before:transition-transform before:duration-800 before:ease-out before:content-[''] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:before:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:grayscale bg-theme-fg text-theme-bg before:bg-mint hover:text-black motion-reduce:hover:bg-mint motion-reduce:hover:text-black motion-reduce:before:hidden h-60 px-20 text-body-10 before:origin-left min-w-200 shrink-0">
            <span data-inner="true" className="relative z-10 flex w-full min-w-0 flex-row items-center justify-between gap-8">
              {"Trade perpetuals"}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.953 15.953" aria-hidden="true" className="size-[1em] shrink-0">
                <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
              </svg>
            </span>
          </a>
        </div>
        <div className="block size-full lg:hidden">
          <button type="button" aria-expanded="false" aria-controls="_R_qlubtaeivb_" className="flex size-full items-center justify-between bg-mint px-12 text-black" onClick={toggleMenu}>
            <span className="relative overflow-hidden" style={sx("height:1em;line-height:1em")}>
              <span className="sr-only">
                {"Menu"}
              </span>
              <span aria-hidden="true" className="flex flex-col transition-transform motion-reduce:transition-none" style={sx("transform:translateY(0);transition-duration:0.56s;transition-timing-function:cubic-bezier(0.16,1,0.3,1)")}>
                <span className="block whitespace-nowrap" style={sx("height:1em;line-height:1em")}>
                  {"Menu"}
                </span>
                <span className="block whitespace-nowrap" style={sx("height:1em;line-height:1em")}>
                  {"Close"}
                </span>
              </span>
            </span>
            <span aria-hidden="true" className="relative inline-block size-20 shrink-0">
              <span className="absolute inset-x-2 top-1/2 h-2 origin-center bg-current" style={sx("transform:translateY(-4px)")}>
              </span>
              <span className="absolute inset-x-2 top-1/2 h-2 origin-center bg-current" style={sx("transform:translateY(2px)")}>
              </span>
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
