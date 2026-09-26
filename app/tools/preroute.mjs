// Emit a shell at each route's real path so a static host serves the app for deep
// links even without rewrites (the reference's URLs are real paths, not hashes).
import { mkdirSync, copyFileSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const routes = ['trade', 'trade/options', 'portfolio', 'list-token'];

const index = join(dist, 'index.html');
if (!existsSync(index)) {
  console.error('preroute: dist/index.html missing — run vite build first');
  process.exit(1);
}
const html = readFileSync(index, 'utf8');

for (const r of routes) {
  const out = join(dist, r, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  copyFileSync(index, out);
}
const dir = join(dist, 'trade', 'options');
writeFileSync(join(dir, '.keep'), '');

console.log(`preroute: wrote ${routes.length} route shells`);
