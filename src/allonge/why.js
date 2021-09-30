/**
 * Why? It enables you to make recursive functions without needing to bind a function to a name in an environment.
 *  * 
 * @param {function} fn 
 * @returns {function}
 * 
 */
export const why =
  fn =>
    (x => x(x))(
      maker =>
        (...args) =>
          fn.call(this, maker(maker), ...args)
    );
