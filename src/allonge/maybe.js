
/**
 * maybe reduces the logic of checking for nothing to a function call.
 * @param {function} fn 
 * @returns {function}
 */
export const maybe = (fn) =>
    function (...args) {
        if (args.length === 0) {
            return
        }
        else {
            for (let arg of args) {
                if (arg == null) return;
            }
            return fn.apply(this, args)
        }
    }