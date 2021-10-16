
/**
 * Builds a list from a seed value. Accepts an recursion function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * recursion function.
 *
 * The recursion function receives one argument: *(seed)*.
 *
 * @type (('seed -> 't[]]), 'seed) -> 't[]
 * @param {Function} fn The recursion function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      const f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */
export function unfold(fn, seed) {
  let pair = fn.call(this, seed);
  let result = [];
  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn.call(this, pair[1]);
  }
  return result;
}
