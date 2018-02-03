var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

var webpack = require('webpack');
// require('babel-polyfill');


var rootAssetPath = './assets';
var nodeModulesPath = './node_modules';

var config = {
    entry: {
        vendor: [
            'babel-polyfill',
            nodeModulesPath + '/semantic-ui-dist/dist/semantic.js',
            nodeModulesPath + '/semantic-ui-dist/dist/semantic.css'
        ],
        main: [
            rootAssetPath + '/js/main.js',
            rootAssetPath + '/css/main.scss'
        ],
        index: [
            rootAssetPath + '/js/index.js'
        ],
        // second_page:[ rootAssetPath + '/js/select_numbers.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: ['babel-loader']},
            {test: /\.(css)$/, loader: ExtractTextPlugin.extract(['css-loader'])},
            {test: /\.(scss)$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])},
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                        }
                    },
                ]
            },
            {test: /\.(woff|woff2|eot|[ot]tf|svg)$/, loader: 'url-loader?limit=65000&name=public/fonts/[name].[ext]'},
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            chunks: [
                'vendor',
                // 'select_numbers_js',
                'main',
                'index'
            ],
            chunksSortMode: 'manual',
        }),
        new ManifestRevisionPlugin(path.join('build', 'manifest.json'), {
            rootAssetPath: rootAssetPath,
            ignorePaths: ['/css', '/js']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
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