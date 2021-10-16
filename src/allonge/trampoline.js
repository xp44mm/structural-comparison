/**
 * A trampoline is a loop that iteratively invokes thunk-returning functions (continuation-passing style).
 * 
 * @param {function} fn that is a function with no arguments
 * @param {any[]} args the arguments of fn
 * @returns {any} the return value of fn
 */
export const trampoline = (fn, ...args) => {
    let value = fn.apply(this, args)
    while (value && typeof value === 'function') {
        value = value()
    }
    return value
}

