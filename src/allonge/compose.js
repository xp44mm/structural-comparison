export function compose(...fns) {
    if (fns.length === 0) return x => x
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
