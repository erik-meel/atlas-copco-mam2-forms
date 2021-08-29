var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

function createReportsOutputFiles(mergeExistingConfigObject, plugins) {
  var out = plugins || [];
  var reportsDirs = helpers.getReportDirectories();
  for (var i = 0; i < reportsDirs.length; i++) {
    if (reportsDirs[i].match(/report-\w*/gi)) {
      mergeExistingConfigObject.filename = reportsDirs[i] + '.html';
      out.push(new HtmlWebpackPlugin(mergeExistingConfigObject));
    }
  }
  return out;
}

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

  plugins: createReportsOutputFiles({
    inject: false,
    title: 'Atlas Copco Forms',
    favicon: 'src/favicon.ico',
    template: 'src/index.ejs'
  }, [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ProvidePlugin({
      SignaturePad: 'signature_pad/dist/signature_pad.js'
    })
  ])
};
