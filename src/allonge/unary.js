/**
 * Unary takes any function and turns it into a function taking exactly one argument.
 * @param {function} fn 
 * @returns {function}
 */
export const unary = (fn) =>
  fn.length === 1
    ? fn
    : function (something) {
      return fn.call(this, something)
    }