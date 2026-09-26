import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The reference site's own stylesheets are copied verbatim into public/css and
// referenced by absolute URL, so Vite must not touch them -- fidelity over
// bundling. Only the app's own code goes through the bundler.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
