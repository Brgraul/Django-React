const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app/checkout.js'),
  build: path.join(__dirname, 'build')
};
var webpack = require('webpack');
module.exports = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'react_instavets.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
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
      title: 'Instavets'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    /*
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),*/
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false,
      compress: {
        warnings: true,
      }
    }),
  ]
};
