const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: "./src/index.js",    //Lấy nguồn từ file index.js
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[contenthash].js"
    },
    plugins: [
        new CleanWebpackPlugin(), //Dọn dẹp file dư thừa
        new HtmlWebpackPlugin({    //Tối ưu hóa file html
            title : "Caching",
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({     //Minify CSS
            filename: "style.min.css"
        })
    ],
    optimization: {
        splitChunks: {  //Gom chung file thư viện
            cacheGroups : { //Cache
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
        minimizer : [new OptimizeCSSAssetsPlugin({}) /*Tối uu hóa file css */, new TerserJSPlugin({}) /*Minify JS*/]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,"css-loader"]
            }
        ]
    },
    devServer: {    //Chạy webpack server
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    devtool: "inline-source-map", //source-map
}