const path = require('path');
const webpack = require('webpack');
var ZopfliPlugin = require("zopfli-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CONF = require('./conf');

module.exports = {
  entry: {
     index: path.resolve('./src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(CONF.DEST_ASSETS_PATH),
    publicPath: path.resolve(CONF.BASE_DEST_PATH)
  },
  module: {
     rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: path.resolve(CONF.SRC_PATH),
        exclude: /(node_modules)/
      },
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
          'babel-loader'
        ]
      }
    ]
  },
  optimization: {
    mergeDuplicateChunks: true,
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
      template: `${CONF.SRC_PATH}/index.html`,
    }),
    //new webpack.NoErrorsPlugin(),
		//new webpack.optimize.DedupePlugin(),
    new webpack.AutomaticPrefetchPlugin()
   // new webpack.optimize.UglifyJsPlugin({
	//		output: { comments: false },
	//		exclude: [ /\.min\.js$/gi ]
  //  }),
    ,
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
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