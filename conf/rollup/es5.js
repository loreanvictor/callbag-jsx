import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import base from './base';


export default Object.assign(base, {
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ["@babel/preset-env"],
    }),
    terser(),
    nodeResolve(),
  ],
  output: Object.assign(base.output, {
    file: 'dist/bundles/callbag-jsx.es5.min.js',
  }),
});
