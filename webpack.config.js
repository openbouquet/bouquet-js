/*global __dirname, require, module*/

const webpack = require( 'webpack' );
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require( 'path' );
const env = require( 'yargs' ).argv.env; // use --env with webpack 2

let libraryName = 'bouquet';

let plugins = [], outputFile;

if ( env === 'build' ) {
    plugins.push( new UglifyJsPlugin( { minimize: true }) );
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}

const config = {
        target: 'node',
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: outputFile,
        library: 'Bouquet',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.json', '.js']
    },
    plugins: plugins
};

module.exports = config;
