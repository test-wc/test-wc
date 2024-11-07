/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { litScss } from 'rollup-plugin-scss-lit';
import sass from 'rollup-plugin-sass';

const GLOBAL_STYLESHEETS = ['**/global.scss']

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.bundle.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
    resolve(),
    /**
     * This minification setup serves the static site generation.
     * For bundling and minification, check the README.md file.
     */
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    litScss({
      // include: ['**/*.css'],
      minify: process.env.NODE_ENV === 'production',
      options: { loadPaths: ['node_modules'] },
      exclude: GLOBAL_STYLESHEETS
    }),
    sass({
      output: 'dist/global.css',
      include: GLOBAL_STYLESHEETS
    }),
    summary(),
  ],
};
