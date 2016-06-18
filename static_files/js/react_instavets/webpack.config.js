const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app/loader.js'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'test.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    })
  ]
};
