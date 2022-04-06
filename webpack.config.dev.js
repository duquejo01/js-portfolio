const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: [ './src/index.js' ],
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]',   
        clean: true,    
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.html'],
        alias: {
            '@utils': path.resolve( __dirname, 'src/utils/'),
            '@templates': path.resolve( __dirname, 'src/templates/'),
            '@styles': path.resolve( __dirname, 'src/styles/'),
            '@images': path.resolve( __dirname, 'src/assets/images/'),
            '@fonts': path.resolve( __dirname, 'src/assets/fonts/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg)/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[contenthash].[ext]'
                },
            }
        ],
    },   
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve( __dirname, 'src', 'assets/images' ),
        //             to: 'assets/images'
        //         }
        //     ]
        // }),
        new DotenvWebpackPlugin(),
        new BundleAnalyzerPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join( __dirname, 'dist' ),
            watch: true,
        },
        watchFiles: path.join( __dirname, "./**"),
        compress: true,
        historyApiFallback: true,
        port: 3006,
        open: true
    }
};
