// @ts-check
import { defineConfig } from 'astro/config';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://pwnfuzz.github.io',
  integrations: [mermaid()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      // @ts-ignore
      langs: ['c'],
    },
  },
});
