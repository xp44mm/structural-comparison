export function compose(...fns) {
    if (fns.length === 0) throw new Error('compose()')
    return function (...args) {
        let maxi = fns.length - 1
        let acc = fns[maxi].apply(this, args)
        for (let i = maxi - 1; i >= 0; i--) {
            let fn = fns[i]
            acc = fn.call(this, acc)
        }
        return acc
    }
}

export function composer(...args) {
    if (args.length === 0) throw new Error('composer()')
    let result = args[args.length - 1]
    for (let i = args.length - 2; i >= 0; i--) {
        let fn = args[i]
        result = fn.call(this, result)
    }
    return result
}
