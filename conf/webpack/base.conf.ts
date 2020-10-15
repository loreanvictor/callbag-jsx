/* tslint:disable: no-default-import */
/* tslint:disable: no-default-export */

import path from 'path';
import webpack from 'webpack';


const config: webpack.Configuration = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../../src')
    ]
  },
};

export default config;
