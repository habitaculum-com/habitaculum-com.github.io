// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL y BASE_PATH los completa automáticamente el flujo de publicación
// (.github/workflows/deploy.yml). En local no hace falta tocarlos.
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  build: { assets: 'recursos' },
});
