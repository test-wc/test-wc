import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { fileURLToPath } from 'url';
import { rollupAdapter } from "@web/dev-server-rollup";
import { litScss } from "rollup-plugin-scss-lit";

export default {
  rootDir: '.',
  files: 'src/**/*.test.ts', // "default" group
  concurrentBrowsers: 3,
  nodeResolve: {
    exportConditions: ['production', 'default'],
  },
  // From https://github.com/readthedocs/ethical-ad-client/blob/main/web-test-runner.config.mjs
  mimeTypes: {
    "**/*.scss": "js",
    "**/*.css": "js",
    "**/*.svg": "js",
    "**/*.json": "js",
  },
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
  plugins: [
    rollupAdapter(litScss({
      include: ['**/*.scss'],
      options: { loadPaths: ['node_modules'] },
    })),
    esbuildPlugin({
      ts: true,
      tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
    }),
  ],
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  testRunnerHtml: testFramework => `
    <html lang="en-US">
      <head></head>
      <body>
        <script>
          window.process = {env: { NODE_ENV: "production" }}
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
};