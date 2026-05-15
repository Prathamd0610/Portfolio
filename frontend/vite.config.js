import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon-light.svg', 'favicon-dark.svg'],
      manifest: false, // we use external manifest.json
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,pdf}']
      }
    })
  ],
  server: {
    proxy: {
      // Proxy all requests starting with /api to the backend server
      '/api': 'http://localhost:5000'   // <<< change port if your backend uses a different one
    }
  }
});