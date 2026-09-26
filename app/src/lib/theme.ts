import { useSyncExternalStore } from 'react';

/**
 * Theme is `html[data-theme]` + localStorage key `merps-theme`, exactly as the
 * reference does it. The bootstrap script in index.html applies the stored value
 * before paint; this module owns changes after that, and notifies subscribers so
 * anything derived from the theme (the GMGN embed URL, for one) re-renders.
 *
 * Switching also runs the reference's own `theme-sweep-*` view transition: the
 * class picks the sweep direction (ltr when going dark, rtl when going light) and
 * the CSS in the vendored stylesheet draws it with `::view-transition-new(root)`.
 */
const KEY = 'merps-theme';
export type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();

function subscribe(f: () => void) {
  listeners.add(f);
  return () => {
    listeners.delete(f);
  };
}

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* storage can be unavailable; the attribute is what matters */
  }
  listeners.forEach((f) => f());
}

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

export function toggleTheme() {
  const html = document.documentElement;
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  const sweep = next === 'dark' ? 'theme-sweep-ltr' : 'theme-sweep-rtl';
  const apply = () => setTheme(next);

  const doc = document as ViewTransitionDoc;
  if (typeof doc.startViewTransition !== 'function') {
    apply();
    return;
  }
  html.classList.add(sweep);
  doc.startViewTransition(apply).finished.finally(() => html.classList.remove(sweep));
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, currentTheme, () => 'light' as Theme);
}
