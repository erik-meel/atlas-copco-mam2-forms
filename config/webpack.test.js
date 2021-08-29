var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'test';

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'cordova': './src/cordova.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts',
    'customization': './src/customization.ts'
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: 'null'
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  }
}
