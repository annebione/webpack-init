const path = require('path');
const webpack = require('webpack');
var ZopfliPlugin = require("zopfli-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
     index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './public'
  },
  module: {
     preLoaders: [
        { loader: 'source-map' }
     ],
     use: [
      {
        enforce: 'pre',
        loader: 'source-map',
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(jsx|js|node_modules)$/,
        exclude: /\.(spec.js|test.js)$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 60,
      maxSize: 300,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin(),
    new webpack.AutomaticPrefetchPlugin(),
    new webpack.optimize.UglifyJsPlugin({
			output: { comments: false },
			exclude: [ /\.min\.js$/gi ]
		}),
    new ZopfliPlugin({
      asset: "[path].gz[query]",
      algorithm: "zopfli",
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};