
/**
 * callFirst are for quickly and simply applying a single argument from the leftmost.
 * @param {function} fn 
 * @param {any} larg the leftmost argument of fn
 * @returns {function} 
 */
export const callFirst = (fn, larg) =>
    function (...rest) {
        return fn.call(this, larg, ...rest);
    }

/**
 * callLast are for quickly and simply applying a single argument from the rightmost.
 * @param {function} fn 
 * @param {any} rarg the rightmost argument of fn
 * @returns {function} 
 */
export const callLast = (fn, rarg) =>
    function (...rest) {
        return fn.call(this, ...rest, rarg);
    }

/**
 * callLeft are for quickly and simply applying several arguments from the leftmost.
 * @param {function} fn 
 * @param {...any} args the leftmost several arguments of fn
 * @returns {function} 
 */
export const callLeft = (fn, ...args) =>
    (...remainingArgs) =>
        fn(...args, ...remainingArgs);

/**
 * callRight are for quickly and simply applying several arguments from the rightmost.
 * @param {function} fn 
 * @param {...any} args the rightmost several arguments of fn
 * @returns {function} 
 */
 export const callRight = (fn, ...args) =>
    (...remainingArgs) =>
        fn(...remainingArgs, ...args);