const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
