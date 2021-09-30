export function pipeline(...fns) {
    if (fns.length === 0) return x => x
    return function (...args) {
        let acc = fns[0].apply(this, args)
        for (let i = 1; i < fns.length; i++) {
            let fn = fns[i]
            acc = fn.call(this, acc)
        }
        return acc
    }
}
