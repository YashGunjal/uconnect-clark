const path = require('path');

module.exports = {
  root: path.resolve(__dirname, './'),
  entryPath: path.resolve(__dirname, './', 'index.web.js'),
  outputPathProd: path.resolve(__dirname, './', 'dist'),
  outputPathDev: path.resolve(__dirname, './', 'dev'),
  publicPath: path.resolve(__dirname, './', 'web'),
  templatePath: path.resolve(__dirname, './', 'web/index_web.html'),
  favicon: path.resolve(__dirname, './', 'web/favicon.ico'), 
  cssFolder: 'css',
};