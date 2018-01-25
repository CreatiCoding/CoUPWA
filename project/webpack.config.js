'use strict';
const path = require('path');

module.exports = {
    entry: {
        main: ['./src/main.js'],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                loaders: 'babel-loader',
            },
        ],
    },
    plugins: [],
    devServer: {
        contentBase: './public',
        host: 'localhost',
        port: 8080,
    },
};
