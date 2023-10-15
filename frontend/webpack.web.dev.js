const { merge } = require('webpack-merge');
const common = require('./web/webpack/webpack.common');

const env = 'development';
const envConfig = require(`./web/webpack/webpack.${env}.js`);
module.exports = merge(common(env), envConfig);
