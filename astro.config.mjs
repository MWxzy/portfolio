// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lasperkaine.github.io',
  base: process.env.VERCEL ? '/' : '/portfolio/',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});