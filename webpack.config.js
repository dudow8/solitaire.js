const path = require("path");
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/presentation/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
        port: "8080",
        hot: true,
        liveReload: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: `<div id="root"></div>`
        }),
        new EnvironmentPlugin({
            presentation: 'web',
        }),
    ]
}