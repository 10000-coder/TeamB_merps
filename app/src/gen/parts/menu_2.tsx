import { sx, onImgError, onImgErrorHide } from '../../lib/dom';
import { useMenuOpen, useChromeHandlers } from '../../lib/ui';

export function menu_2() {
  const open = useMenuOpen();
  return (
    <>
      <div id="site-mobile-menu" aria-hidden={open ? "false" : "true"} className="fixed inset-x-0 bottom-0 z-2 flex flex-col bg-mint text-black lg:hidden" style={sx(open ? "top:var(--site-header-height);pointer-events:auto;opacity:1;transform:none;visibility:visible;transition:opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1), visibility 0s linear 500ms" : "top:var(--site-header-height);pointer-events:none;opacity:0;transform:translateY(-2%);visibility:hidden;transition:opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1), visibility 0s linear 500ms")}>
        <nav className="flex flex-col divide-y">
          <a href="/trade" className="flex items-center justify-between p-20 text-headline-10" style={sx(open ? "opacity:1;transform:none;transition:opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms" : "opacity:0;transform:translateY(12px);transition:opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms")}>
            {"Perpetuals"}
            <svg viewBox="0 0 15.953 15.953" aria-hidden={open ? "false" : "true"} className="size-[1em] shrink-0">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
            </svg>
          </a>
          <a href="/trade/options" className="flex items-center justify-between p-20 text-headline-10" style={sx(open ? "opacity:1;transform:none;transition:opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms" : "opacity:0;transform:translateY(12px);transition:opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms")}>
            {"Options"}
            <svg viewBox="0 0 15.953 15.953" aria-hidden={open ? "false" : "true"} className="size-[1em] shrink-0">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
            </svg>
          </a>
          <a href="/list-token" className="flex items-center justify-between p-20 text-headline-10" style={sx(open ? "opacity:1;transform:none;transition:opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms" : "opacity:0;transform:translateY(12px);transition:opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms")}>
            {"List a token"}
            <svg viewBox="0 0 15.953 15.953" aria-hidden={open ? "false" : "true"} className="size-[1em] shrink-0">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
            </svg>
          </a>
          <a href="/portfolio" className="flex items-center justify-between p-20 text-headline-10" style={sx(open ? "opacity:1;transform:none;transition:opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms" : "opacity:0;transform:translateY(12px);transition:opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms")}>
            {"Portfolio"}
            <svg viewBox="0 0 15.953 15.953" aria-hidden={open ? "false" : "true"} className="size-[1em] shrink-0">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
            </svg>
          </a>
          <a href="https://x.com/MerpsOrg" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-20 text-headline-10" style={sx(open ? "opacity:1;transform:none;transition:opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms" : "opacity:0;transform:translateY(12px);transition:opacity 500ms ease 0ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms")}>
            <span className="flex items-center gap-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden={open ? "false" : "true"} className="block shrink-0 text-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {"MERPS"}
              {" on X"}
            </span>
            <svg viewBox="0 0 15.953 15.953" aria-hidden={open ? "false" : "true"} className="size-[1em] shrink-0">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
            </svg>
          </a>
        </nav>
        <a href="/trade" className="mt-auto flex h-60 items-center justify-between bg-black px-20 text-body-10 text-white">
          {"Trade perpetuals"}
          <svg viewBox="0 0 15.953 15.953" aria-hidden={open ? "false" : "true"} className="size-[1em] shrink-0">
            <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M.75 7.976h14.143M7.82.906l7.072 7.07-7.072 7.071" />
          </svg>
        </a>
      </div>
    </>
  );
}
