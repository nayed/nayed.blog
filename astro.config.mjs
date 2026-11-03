// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { wireCopyTheme } from './src/markdown/wire-copy-theme';
import { wireCopyFrame } from './src/markdown/wire-copy-frame';

export default defineConfig({
  site: 'https://nayed.blog',
  trailingSlash: 'always',
  // Fetch a page as soon as the reader hovers or focuses its link, so the click lands instantly.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: wireCopyTheme,
      transformers: [wireCopyFrame()],
    },
  },
});
