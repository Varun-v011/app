// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Add this base property for Electron compatibility
  base: './', // Ensures relative paths work correctly in Electron's file:// protocol
  build: {
    outDir: 'dist', // Default for Vite, but good to be explicit
  },
});