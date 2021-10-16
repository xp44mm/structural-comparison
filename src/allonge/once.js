/**
 * once is an combinator. It ensures that a function can only be called, well, once.
 * @param {function} fn 
 * @returns {any}
 */
export const once = (fn) => {
    let invocations = new WeakSet()
    let done = false;
    return function (...args) {
        if (this) {
            if (invocations.has(this)) return;
            invocations.add(this);
        } else {
            if (done) return
            done = true
        }
        return fn.apply(this, args)
    }
}

