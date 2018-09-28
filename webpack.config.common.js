const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CONF = require('./conf');

const webpackCommonConfig = {
  entry: {
     "index": path.resolve('./src/index.js'),
     "vendor": ["react", "redux"]
  },
  module: {
     rules: [
    /*  {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        include: path.resolve(CONF.SRC_PATH),
        exclude: /(node_modules)/,
        options: {
          fix: true,
          failOnError: false
        }
      }, */
      {
        test: /\.scss$/,
        include: path.resolve(CONF.SRC_PATH),
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(CONF.SRC_PATH + '/assets'),
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /\.(spec.js|test.js)$/,
        include: path.resolve(CONF.SRC_PATH),
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      }
    ]
  },
  optimization: {
    mergeDuplicateChunks: true,
    occurrenceOrder: true,
    splitChunks: {
      chunks: 'all',
      minSize: 1000,
      maxSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          priority: 20,
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: 20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(CONF.SRC_PATH + '/index.html'),
      filename: '../index.html'
    }),
    new webpack.AutomaticPrefetchPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ],
  output: {
    path: path.join(__dirname, CONF.BASE_DEST_PATH),
    publicPath: './assets/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
};


module.exports = webpackCommonConfig;

console.log(webpackCommonConfig);