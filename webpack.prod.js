const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',

    output: {
        filename: '[name].[contenthash].js',
    },

    externals: [
        function rxjsExternals({ request }, callback) {
            const parts = request.split('/')
            if (parts[0] === 'rxjs') {
                return callback(null, {
                    root: parts,
                    commonjs: request,
                    commonjs2: request,
                    amd: request,
                })
            } else { callback() }
        },
    ],

    output: {
        filename: 'hyperscript-rxjs.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'hyperscript',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
})
