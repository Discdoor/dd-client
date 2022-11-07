const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge(require('./webpack.common'), {
    mode: 'development',
    devServer: {
        static: path.join(__dirname, '../dist'),
        compress: true,
        allowedHosts: 'all',
        hot: false,
        liveReload: true,
        port: 8192,
        historyApiFallback: true
    }
});