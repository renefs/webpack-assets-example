var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

var webpack = require('webpack')


var config = {
    entry: {
        index_js: './assets/js/index.js',
        select_numbers_js: './assets/js/select_numbers.js',
        // styles_css: './assets/css/test.scss',
        vendor_css: [
            './assets/css/index.css'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(css)$/, loader: ExtractTextPlugin.extract('css-loader')}
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    )
}

module.exports = config;