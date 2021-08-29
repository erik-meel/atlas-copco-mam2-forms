var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
  entry: helpers.createReportsEntries({
    'vendor': ['./src/polyfills.ts', './src/vendor.ts'],
    'cordova': './src/cordova.ts',
    'customization': './src/customization.ts'
  }),

  devtool: 'inline-source-map',

  output: {
    path: helpers.root('build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: helpers.createReportsChunks(['customization']),
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'cordova'],
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new ExtractTextPlugin('[name].css')
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
});
