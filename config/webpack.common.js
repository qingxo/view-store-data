const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

const path = require('path');
const rootPath = path.resolve(__dirname, '../');

const config = {
    entry: {
        index: path.resolve(rootPath, 'src/index.js'),
    },   // 入口文件
    output: {
        path: path.resolve(rootPath, 'dist'),   // 输出目录
        publicPath: '/',
        chunkFilename: 'js/[name].[hash:8].bundle.js',
        filename: '[name].bundle.js',// 输出文件名
        libraryTarget: 'umd', // 使用通用模块定义
        umdNamedDefine: true, // 使用命名的AMD模块定义
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',  // 将CSS样式插入到页面中
                    'css-loader'     // 解析CSS文件
                ]
            },
            {
                test: /\.css$/,
                include: [path.resolve(rootPath, 'node_modules/react-json-view-lite')],
                use: [
                    'style-loader',  // 将CSS样式插入到页面中
                    'css-loader'     // 解析CSS文件
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',  // 将样式插入到页面中
                    'css-loader',    // 解析CSS文件
                    'less-loader'    // 转译Less文件为CSS
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less']   // 支持的文件扩展名
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootPath, 'public/index.html'), // 指定 HTML 模板文件路径
            filename: 'index.html', // 输出的 HTML 文件名
            chunks: ['index'], // JS 文件的名称，需要与 entry 中的 key 对应
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};

module.exports = config;