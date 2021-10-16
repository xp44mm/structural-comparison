
/**
 * The mockingbird is a function that takes another function, and returns a function. 
 * That function takes a bunch or arguments, and invoked the original function with itself and the arguments.
 * 
 * @param {function} fn 
 * @returns {function}
 */
export const mockingbird = fn => (...args) => fn(fn, ...args);