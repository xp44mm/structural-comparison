/**
 *  a function that wraps around map and turns any other function into a mapper.
 * @param {function} fn 
 * @returns 
 */
export const mapWith = (fn) => (list) => list.map(fn);


