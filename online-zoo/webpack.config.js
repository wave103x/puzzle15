const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = ['./src/main/index', './src/donate/index'];

module.exports = {
    mode: 'development',
    entry: {
        main: './src/pages/main/script.js',
        donate: './src/pages/donate/script.js',
    },
    devtool: 'inline-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            // chunkFilename: '[name].css',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            // chunkFilename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/main/index.html',
            filename: "index.main.html",
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/donate/index.html',
            filename: "index.donate.html",
            chunks: ['donate'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][ext]',
        clean: true,
    },
}