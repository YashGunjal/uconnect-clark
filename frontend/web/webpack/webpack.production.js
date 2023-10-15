
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const commonPaths = require('./../../paths');
module.exports = {
    mode: 'production',
    output: {
        filename: '[name].[hash].js',
        path: commonPaths.outputPathProd,
        chunkFilename: '[name].[chunkhash].js',
        clean: true // https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },

    module: {
        rules: [
            
        ],
    },
    plugins: [
      
    ],
    devtool: 'source-map',
};