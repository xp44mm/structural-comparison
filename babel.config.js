module.exports = function (api) {
    api.cache.using(() => process.env.NODE_ENV)

    let presets = [
        [
            '@babel/preset-env',
            {
                targets: api.env('test') ? { node: 'current' } : { chrome: '95', edge: '95' },
                loose: true, // convert from es6 to es5 loosely.
                corejs: 3, //declaring a core-js version
                useBuiltIns: 'entry',
            },
        ],
    ]

    let plugins = [
        //export v from 'mod';
        '@babel/plugin-proposal-export-default-from',
        //export * as ns from "xyz";
        '@babel/plugin-proposal-export-namespace-from',
    ]

    return { presets }
}
