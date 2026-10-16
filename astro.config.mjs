import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Subdominio gratuito provisional: cambiar al desplegar.
  site: 'https://volea-padel.pages.dev',
  prefetch: { prefetchAll: true },
  // CSS pequeño (~7 KB gzip): dentro del HTML para no bloquear el primer pintado.
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
});
