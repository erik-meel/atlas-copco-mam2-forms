var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

var currentReport = "";

if (process.argv.length < 3)
  console.log("you must enter a report name, i.e.: report-visit");

var currentReport = process.argv[2];

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: [helpers.root('src', 'forms'), helpers.root('src', 'reports')],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.css$/,
        include: [helpers.root('src', 'forms'), helpers.root('src', 'reports')],
        loaders: ['exports-loader?module.exports.toString()', 'css-loader']
      }
    ]
  },

  entry: helpers.createSingleReportEntries(currentReport, {
    'vendor': ['./src/polyfills.ts', './src/vendor.ts'],
    'cordova': './src/cordova.ts',
    'customization': './src/customization.ts'
  }),

  devtool: 'inline-source-map',

  output: {
    path: helpers.root('build-' + currentReport),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: helpers.createSingleReportChunks(currentReport, ['customization']),
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
    new ExtractTextPlugin('[name].css'),
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ProvidePlugin({
      SignaturePad: 'signature_pad/dist/signature_pad.js'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Atlas Copco Forms',
      favicon: 'src/favicon.ico',
      template: 'src/index.single.ejs',
      filename: 'index.html',
      report: currentReport
    })
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }

};
