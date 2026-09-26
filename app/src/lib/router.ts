import { useEffect, useState } from 'react';
import { ROUTES, type RouteEntry } from '../gen/routes';

/**
 * Pathname routing, because the reference's URLs are real paths (`/trade`,
 * `/trade/options`, ...) and not hashes. Deep links work via `vercel.json`
 * rewrites plus prerendered per-route shells emitted at build time.
 */
export function normalizePath(p: string): string {
  const bare = p.split('?')[0].split('#')[0];
  const trimmed = bare.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function findRoute(path: string): RouteEntry | undefined {
  const want = normalizePath(path);
  return ROUTES.find((r) => r.path === want);
}

export function useRoutePath(): string {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    // Intercept internal navigation so the clone routes client-side, exactly like
    // the reference's <Link>. External links are left alone.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey ||
          e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('/') || href.startsWith('//')) return;
      if (a.getAttribute('target') === '_blank') return;
      e.preventDefault();
      const next = normalizePath(href);
      if (next !== normalizePath(window.location.pathname)) {
        window.history.pushState({}, '', next);
        setPath(next);
        window.scrollTo(0, 0);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return path;
}
