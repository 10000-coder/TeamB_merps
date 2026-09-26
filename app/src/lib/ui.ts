import { useSyncExternalStore } from 'react';
import { toggleTheme } from './theme';

/**
 * Menu open/closed state. The reference holds this in React state; the captured
 * DOM only ever contains the CLOSED variant, so this store is what lets the
 * generated markup switch to the derived open state.
 */
let menuOpen = false;
const subs = new Set<() => void>();

function emit() {
  subs.forEach((f) => f());
}

function subscribe(f: () => void) {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
}

export function useMenuOpen(): boolean {
  return useSyncExternalStore(subscribe, () => menuOpen, () => false);
}

export function toggleMenu() {
  menuOpen = !menuOpen;
  emit();
}

export function closeMenu() {
  if (!menuOpen) return;
  menuOpen = false;
  emit();
}

/** Handlers the generated chrome components reference by name. */
export function useChromeHandlers() {
  return { toggleTheme, toggleMenu };
}

export { toggleTheme };
