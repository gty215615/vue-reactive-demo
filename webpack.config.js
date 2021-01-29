const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        reactive: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js"
    },
    mode: 'development',
    devServer: {
        contentBase: '.',
        port: 3000,

    },
    devtool:'source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: ['ts-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: "reactive",
        template: './index.html'
    })]
}