import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'src/pages'),
      component: path.resolve(__dirname, 'src/component'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
});
