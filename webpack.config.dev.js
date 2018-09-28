 const merge = require('webpack-merge');
 const path = require('path');
 const common = require('./webpack.config.common.js');

 const CONF = require('./conf');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
  /* module: {
        rules: [{
              test: /\.(js|jsx)$/,
              include: path.resolve(CONF.SRC_PATH),
              exclude: /\.(spec.js|test.js)$/,
              loader: require.resolve('babel-loader'),
              options: {
                plugins: ['react-hot-loader/babel'],
            }
        }]
   }, */
   devServer: {
      port: process.env.PORT || 4200,
      publicPath: '/',
      contentBase: './dist'
   }
});