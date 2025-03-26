import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { litScss } from 'rollup-plugin-scss-lit';
import sass from 'rollup-plugin-sass';
import alias from '@rollup/plugin-alias';
import multi from '@rollup/plugin-multi-entry';

const GLOBAL_STYLESHEETS = ['**/global.scss']

const PLUGINS_PER_ELEMENT = [
  alias(
    {
      entries: [
        { find: /\?inline$/, replacement: '' }
      ]
    }
  ),
  replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
  resolve(),
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
    include: ['**/*.scss'],
    minify: process.env.NODE_ENV === 'production',
    options: { loadPaths: ['node_modules'] },
    exclude: GLOBAL_STYLESHEETS
  }),
  sass({
    output: 'dist/global.css',
    include: GLOBAL_STYLESHEETS
  }),
  summary(),
]

const ENTRY_FILES = [
	{
		input: 'src/button/button.js',
		output: {
			file: 'dist/button.js',
			format: 'esm'
		},
    plugins: PLUGINS_PER_ELEMENT
	},
	{
		input: 'src/input/input.js',
		output: {
			file: 'dist/input.js',
			format: 'esm'
		},
    plugins: PLUGINS_PER_ELEMENT
	},
	{
		input: 'src/icon/icon.js',
		output: {
			file: 'dist/icon.js',
			format: 'esm'
		},
    plugins: PLUGINS_PER_ELEMENT
	}
];

export default ENTRY_FILES