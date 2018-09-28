 const webpack = require('webpack');
 const merge = require('webpack-merge');
 const common = require('./webpack.config.common.js');
 const ClosureCompilerPlugin = require('webpack-closure-compiler');
 const CompressionPlugin = require('compression-webpack-plugin');

 module.exports = merge(common, {
   mode: 'production',
   cache: true,
   devtool: 'source-map',
   plugins: [
    /* new ClosureCompilerPlugin({
        compiler: {
          language_in: 'ECMASCRIPT6',
          language_out: 'ECMASCRIPT5',
          compilation_level: 'ADVANCED'
        },
        concurrency: 3,
      }), */
      new CompressionPlugin(),
      new webpack.optimize.AggressiveSplittingPlugin({
        minSize: 30000,
        maxSize: 50000
      }),
    ]
  });