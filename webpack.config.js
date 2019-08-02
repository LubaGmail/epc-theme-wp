const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let isProduction = process.env.NODE_ENV === 'production';
isProduction = true;

const config = {
    stats: 'verbose',
    // First, let's define an entry point for webpack to start its crawling.
    entry: './index.js',
    // Second, we define where the files webpack produce, are placed
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            { 
                test: /\.(le|c)ss$/, // .less and .css
                use: [ 
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 
                    'css-loader', 
                    'less-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                  'file-loader'
                ]
            },
        ]
    },
    // Add an instance of the MiniCssExtractPlugin to the plugins list
    // But remember - only for production!
    plugins: isProduction ? [new MiniCssExtractPlugin()] : [],
    resolve: {
        alias: {
            images: path.resolve(__dirname, 'images')
        }
    },
    devtool: 'source-map',
};

module.exports = config;
