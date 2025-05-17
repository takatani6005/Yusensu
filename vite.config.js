import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    open: true,
    port: 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true
  }
});

