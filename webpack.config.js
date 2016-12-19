var webpack = require("webpack")

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: "./dist/[name].js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        },
        {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json-loader'
        }]
    }
}