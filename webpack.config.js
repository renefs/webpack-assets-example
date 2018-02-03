var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

var webpack = require('webpack')

var rootAssetPath = './assets';

var config = {
    entry: {
        index_js: rootAssetPath + '/js/index.js',
        select_numbers_js: rootAssetPath + '/js/select_numbers.js',
        styles_css: rootAssetPath + '/css/test.scss',
        vendor_css: [
            rootAssetPath + '/css/index.css'
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
            {test: /\.(css)$/, loader: ExtractTextPlugin.extract('css-loader')},
            {test: /\.(scss)$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])},
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: rootAssetPath + '/images',
                            outputPath: 'images/'
                        }
                    }
                    // 'file-loader?context=' + rootAssetPath + '/images&name=[path][name].[ext]',
                    // 'image-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new ManifestRevisionPlugin(path.join('build', 'manifest.json'), {
            rootAssetPath: rootAssetPath,
            ignorePaths: ['/css', '/js']
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