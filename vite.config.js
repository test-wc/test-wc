import { defineConfig } from 'vite'

export default defineConfig({
    // https://stackoverflow.com/questions/78131542/vite-js-renames-css-class-names-how-to-then-use-class-names-in-css-selectors
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName: "[local]"
      }
    },
    resolve: {
      alias: {
          '@splidejs/splide/src/css/core/index' : 'node_modules/@splidejs/splide/src/css/core/index.scss',
      },
    },
})