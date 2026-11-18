import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { themeInitScript } from './src/theme/theme-script.ts';

export default defineConfig({
  // Relative asset paths work on GitHub Pages project sites and custom domains.
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'theme-init-script',
      transformIndexHtml(html) {
        return html.replace('<!-- theme-init -->', `<script>${themeInitScript}</script>`);
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
