import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { litScss } from 'rollup-plugin-scss-lit';
import alias from '@rollup/plugin-alias';

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
    output: {
      comments: false,
    },
  }),
  litScss({
    include: ['**/*.scss'],
    minify: { fast: true },
    options: { loadPaths: ['node_modules'] },
    exclude: GLOBAL_STYLESHEETS
  }),
  summary(),
]

const ENTRY_FILES = [
	{
		input: 'src/components/button/button.js',
		output: {
			file: 'dist/button.js',
			format: 'esm'
		},
    plugins: PLUGINS_PER_ELEMENT
	},
	{
		input: 'src/components/input/input.js',
		output: {
			file: 'dist/input.js',
			format: 'esm'
		},
    plugins: PLUGINS_PER_ELEMENT
	},
	{
		input: 'src/components/icon/icon.js',
		output: {
			file: 'dist/icon.js',
			format: 'esm'
		},
    plugins: PLUGINS_PER_ELEMENT
	}
];

export default ENTRY_FILES