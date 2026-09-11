import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Backend base URL: override with VITE_API_URL in client/.env for production.
const API_TARGET = process.env.VITE_API_URL || 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Same-origin API in dev: no CORS friction, cookies just work.
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
      },
    },
  },
});
