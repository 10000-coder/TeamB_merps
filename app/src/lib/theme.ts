import { useSyncExternalStore } from 'react';

/**
 * Theme is `html[data-theme]` + localStorage key `merps-theme`, exactly as the
 * reference does it. The bootstrap script in index.html applies the stored value
 * before paint; this module owns changes after that, and notifies subscribers so
 * anything derived from the theme (the GMGN embed URL, for one) re-renders.
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

export function toggleTheme() {
  setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, currentTheme, () => 'light' as Theme);
}
