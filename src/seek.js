// import _curry2 from './internal/_curry2.js';
// import _dispatchable from './internal/_dispatchable.js';
// import _xfind from './internal/_xfind.js';

export let _seek = (list, fn) => {
  let idx = 0;
  let len = list.length;
  let result;
  while (idx < len) {
    result = list[idx](fn)
    if (result) {
      return result
    }
    idx += 1;
  }
  return result
}


/**
 * Applies the given function to list elements, returning the first truthy result.
 * or `undefined` if every results is falsy.
 *
 * Dispatches to the `seek` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.27.0
 * @category List
 * @sig (a -> b) -> [a] -> b | undefined
 * @param {Function} fn The function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.seek(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.seek(R.propEq('a', 4))(xs); //=> undefined
 */
// let seek = _curry2(_dispatchable(['seek'], _xfind, _seek));
// export default seek;
