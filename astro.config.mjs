// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://pwnfuzz.github.io',
  markdown: {
    shikiConfig: {
      theme: 'github-light', // Use GitHub's light theme for syntax highlighting
      wrap: true,
    },
  },
});
