const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        extensions: ['.js', '.json'],
        modules: [path.resolve(__dirname, 'node_modules')],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/[\\/]node_modules[\\/]/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: { babelrc: true },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: [/[\\/]node_modules[\\/]/],
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.html$/,
                exclude: [/[\\/]node_modules[\\/]/],
                use: [{ loader: 'html-loader' }],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                exclude: [/[\\/]node_modules[\\/]/],
                type: 'asset',
            },
        ],
    },

    plugins: [new CleanWebpackPlugin()],
}
