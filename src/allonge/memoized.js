/**
 * We can apply memoized to a function and we will get back a new function that “memoizes” its 
 * results so that it never has to recalculate the same value twice. It only works for functions that are 
 * “idempotent,” meaning functions that always return the same result given the same argument(s).
 * @param {function} fn 
 * @param {function} keymaker 
 * @returns 
 */
export const memoized = (fn, keymaker = JSON.stringify) => {
  const lookupTable = new Map();

  return function (...args) {
    const key = keymaker.call(this, args);
    if (lookupTable.has(key)) {
      return lookupTable.get(key)
    } else {
      let res = fn.apply(this, args)
      lookupTable.set(key, res);
      return res
    }
  }
};
