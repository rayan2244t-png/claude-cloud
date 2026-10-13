import { defineConfig } from 'vite';

// base: './' — сборку можно открыть с любого адреса (GitHub Pages, Netlify, папка на диске)
export default defineConfig({
  base: './',
  build: { chunkSizeWarningLimit: 2000 },
});
