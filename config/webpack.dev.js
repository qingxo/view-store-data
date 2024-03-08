const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');
const { merge } = require('webpack-merge');

const path = require('path');
const rootPath = path.resolve(__dirname, '../');
const common = require('./webpack.common.js');

const config = merge(common, {
    mode: 'development',

    resolve: {
        extensions: ['.js', '.jsx', '.less']   // 支持的文件扩展名
    },
    devServer: {
        client: {
            logging: 'info',
            overlay: true,
            progress: true,
        },
        port: 3000,   // 端口号
        compress: false,  //启用压缩  
        historyApiFallback: true,  // 支持单页面应用路由
        open: true,                                 // 自动打开浏览器
        allowedHosts: 'all',

    }
});

module.exports = config