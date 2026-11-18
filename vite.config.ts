import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import { themeInitScript } from './src/theme/theme-script.ts';

function normalizeBasePath(value: string | undefined): string {
  if (!value || value === '/') {
    return '/';
  }

  if (value === './') {
    return './';
  }

  return `/${value.replace(/^\/+|\/+$/g, '')}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = normalizeBasePath(process.env.VITE_BASE_PATH ?? env.VITE_BASE_PATH);

  return {
    // GitHub Pages project sites are served from /<repo>/. The deploy workflow sets
    // VITE_BASE_PATH automatically; custom domains should set it to `/`.
    base,
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
  };
});
