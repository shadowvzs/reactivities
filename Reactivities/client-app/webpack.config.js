"use strict";
const resolveTsconfigPathsToAlias = require('./resolve-tsconfig-path-to-webpack-alias');
const path = require("path");

module.exports = {
    // Set debugging source maps to be "inline" for
    // simplicity and ease of use
    devtool: "inline-source-map",

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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
