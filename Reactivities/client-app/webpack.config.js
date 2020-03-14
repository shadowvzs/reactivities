"use strict";
const resolveTsconfigPathsToAlias = require('./resolve-tsconfig-path-to-webpack-alias');

module.exports = {
    // Set debugging source maps to be "inline" for
    // simplicity and ease of use
    // inline-source-map option generate more megabyte plus comment in bundlejs !!!
    devtool: "source-map",

    // The application entry point
    entry: "./src/index.tsx",

    // Where to compile the bundle
    // By default the output directory is `dist`
    output: {
        filename: "bundle.js"
    },

    // Supported file loaders
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.(gif|ttf|eot|svg|woff2?)$/,
                use: 'url-loader?name=[name].[ext]',
            },       
            {
                test: /\.(jpg|png|svg)$/,
                use: 'file-loader?name=fonts/[name].[ext]!static'
            },        
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']            
            }
        ] 
    },
    // File extensions to support resolving
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: resolveTsconfigPathsToAlias({
            tsconfigPath: './tsconfig.json', // Using custom path
            webpackConfigBasePath: './src', // Using custom path         
        }),
    }
};
