const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

const path = require('path');
const rootPath = path.resolve(__dirname, './');

module.exports = {
    entry: {
        index: path.resolve(rootPath, 'src/index.js'),
    },   // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),   // 输出目录
        filename: 'bundle.js',   // 输出文件名
        publicPath: '/',
        chunkFilename: 'js/[name].[hash:8].bundle.js',
        chunkFormat: 'commonjs',
        filename: '[name].bundle.js',

    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
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
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(rootPath, 'public'), to: path.resolve(rootPath, 'dist/public'),
        //             globOptions: {
        //                 ignore: ['*.ejs'],
        //             },
        //         },
        //     ],
        // }),
        new webpack.HotModuleReplacementPlugin(),

    ],
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
};
