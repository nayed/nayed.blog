// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { wireCopyTheme } from './src/markdown/wire-copy-theme';
import { wireCopyFrame } from './src/markdown/wire-copy-frame';

export default defineConfig({
  site: 'https://nayed.blog',
  trailingSlash: 'always',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: wireCopyTheme,
      transformers: [wireCopyFrame()],
    },
  },
});
