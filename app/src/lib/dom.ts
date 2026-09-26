import type { CSSProperties } from 'react';

/**
 * Inline `style` strings are carried through the port VERBATIM.
 *
 * The reference inlines theme-dependent colours (`light` and `dark` are two
 * separate colour sets, not one set of CSS variables), so re-authoring them as
 * objects by hand would silently drift. `sx()` parses the captured string into
 * the object React wants, preserving order and custom properties (`--sbw`).
 */
const cache = new Map<string, CSSProperties>();

export function sx(style: string): CSSProperties {
  const hit = cache.get(style);
  if (hit) return hit;

  const out: Record<string, string> = {};
  let depth = 0;
  let buf = '';
  const decls: string[] = [];
  for (let i = 0; i < style.length; i += 1) {
    const ch = style[i];
    if (ch === '(') depth += 1;
    else if (ch === ')') depth -= 1;
    if (ch === ';' && depth === 0) {
      decls.push(buf);
      buf = '';
    } else {
      buf += ch;
    }
  }
  if (buf.trim()) decls.push(buf);

  for (const decl of decls) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop || !val) continue;
    if (prop.startsWith('--')) {
      out[prop] = val;                       // custom property: keep verbatim
    } else {
      // -webkit-mask-image -> WebkitMaskImage (React's vendor-prefix form)
      out[prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = val;
    }
  }
  cache.set(style, out as CSSProperties);
  return out as CSSProperties;
}

/** The reference's own img fallback: `onerror="this.removeAttribute('src')"`. */
export function onImgError(e: { currentTarget: HTMLImageElement }) {
  e.currentTarget.removeAttribute('src');
}

/** The reference's other fallback: `onerror="this.style.display='none'"`. */
export function onImgErrorHide(e: { currentTarget: HTMLImageElement }) {
  e.currentTarget.style.display = 'none';
}
