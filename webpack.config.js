const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        reactive: './src/vue2/index.ts',
        proxy:'./src/vue3/index.ts'
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
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                }
              }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: "reactive",
        template: './index.html'
    })]
}