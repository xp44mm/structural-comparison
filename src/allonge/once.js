/**
 * once is an combinator. It ensures that a function can only be called, well, once.
 * @param {function} fn 
 * @returns {any}
 */
export const once = (fn) => {
    let done = false;
    return function () {
        return done ? void 0 : ((done = true), fn.apply(this, arguments))
    }
}