/**
 * It takes a value and returns a function that always returns the value, 
 * but if you pass it a function, it executes the function for side-effects.
 * It works in both curried and uncurried ways
 * @param {any} value 
 * @param {function} fn 
 * @returns {any} value
 */
export const tap = function (value, fn) {
    const curried = (fn) => (
        typeof (fn) === 'function' && fn.call(this, value),
        value
    );
    return arguments.length === 1
        ? curried
        : curried(fn);
}