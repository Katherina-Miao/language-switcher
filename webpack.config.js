var webpack = require("webpack")


module.exports = {
    entry: {
        app: './demo/index.js'
    },
    output: {
        filename: "./dist/[name].js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        },
        {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json-loader'
        }]
    }
}
