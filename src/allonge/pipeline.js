export function pipeline(...fns) {
    if (fns.length === 0) throw new Error('pipeline()')
    return function (...args) {
        let acc = fns[0].apply(this, args)
        for (let i = 1; i < fns.length; i++) {
            let fn = fns[i]
            acc = fn.call(this, acc)
        }
        return acc
    }
}

export function pipe(...args) {
    if (args.length === 0) throw new Error('pipe()')
    let result = args[0]
    for (let i = 1; i < args.length; i++) {
        let fn = args[i]
        result = fn.call(this, result)
    }
    return result
}

