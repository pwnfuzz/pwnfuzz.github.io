// @ts-check
import { defineConfig } from 'astro/config';
import mermaid from 'astro-mermaid';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://pwnfuzz.github.io',
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      // Map github-dark to our manual [data-theme="dark"] toggle
      themeCssSelector: (theme) =>
        theme.name === 'github-dark' ? '[data-theme="dark"]' : ':root',
      defaultProps: {
        showLineNumbers: true,
        wrap: false,
      },
      styleOverrides: {
        borderRadius: '6px',
        codeFontFamily:
          "'Geist Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        codeFontSize: '0.8125rem',
        codeLineHeight: '1.6',
        uiFontFamily:
          "'Geist Mono', 'JetBrains Mono', ui-monospace, monospace",
        uiFontSize: '0.75rem',
      },
    }),
    mermaid(),
  ],
});
