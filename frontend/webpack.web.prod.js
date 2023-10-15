const { merge } = require('webpack-merge');
const common = require('./web/webpack/webpack.common');

const env = 'production';
const envConfig = require(`./web/webpack/webpack.${env}.js`);
module.exports = merge(common(env), envConfig);
