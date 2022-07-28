const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');
module.exports = (env = {}) => {
 return {
  entry: {
   index: [SRC_DIR + '/index.js']
  },
  output: {
   path: BUILD_DIR,
   filename: '[hash].bundle.js'
  },
  resolve:{
   extensions: ['.js', '.jsx']
  },
  devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
   contentBase: BUILD_DIR,
   port: 9090,
   compress: true,
   hot: true,
   open: true,
   headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH,     OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   },
   historyApiFallback: true
  },
  module: {
   rules: [
    {
     test: /\.(js|jsx)$/,
     exclude: /node_modules/,
     use: {
      loader: 'babel-loader',
      options: { cacheDirectory: true }
     }
    },
    {
     test: /\.html$/,
     loader: 'html-loader'
    },
   ]
   },
   plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
       ecma: 8
      }
    }),
    new HtmlWebpackPlugin(
     {
      inject: true,
      template: './template/index.html',
     }
    ),
   ],
   optimization: {
    splitChunks: {
     chunks: 'all'
    }
   }
 }
};