const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',

    output: {
        filename: 'structural-comparison.js',
        library: 'structuralComparison',
        libraryTarget: 'umd',
        globalObject: 'this',
    },

    // externals: [
    //     function rxjsExternals({ request }, callback) {
    //         const parts = request.split('/')
    //         if (parts[0] === 'rxjs') {
    //             return callback(null, {
    //                 root: parts,
    //                 commonjs: request,
    //                 commonjs2: request,
    //                 amd: request,
    //             })
    //         } else { callback() }
    //     },
    // ],

})
