const webpack = require('webpack');
const commonPaths = require('./../../paths');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPathDev,
    chunkFilename: '[name].js',
  },
  module: {
    rules: [],
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: true,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};