// @ts-check
import { defineConfig } from 'astro/config';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://pwnfuzz.github.io',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    }
  },
  integrations: [
    mermaid(),
  ],
});
