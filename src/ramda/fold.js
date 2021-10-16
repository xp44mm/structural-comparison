
/**
 * This function mimics the recursive function that accepts an accumulator parameter in functional programming.
 * 
 * This function calls recursively the iterator function using the followed accumulator and seed. 
 * Each call to the iterator function returns a tuple that consists of next accumulator and next seed. 
 * When the `iterator` function returns no seed, the `fold` function returns the last accumulator to the caller. 
 * the `iterator` function receives two argument, `acc` and `seed`, and returns an array of length two to proceed. 
 * The element at index 0 of this array is next accumulator, and the element at index 1 is next seed.
 * 
 * @type ('fn, 'acc, 'seed) -> 'acc when 'fn: ('acc,'seed) -> ['acc,'seed]
 * @param {function} iterator The iterator function. 
 * @param {a} acc The result value.
 * @param {b} seed The seed value.
 * @return {a} return the last acc.
 * 
 */
export const fold = function (iterator, acc, seed) {
    while (seed != null) {
        let pair = iterator.call(this, acc, seed)
        if (pair == null || pair.length === 0) break
        acc = pair[0]
        if (pair.length === 1) break
        seed = pair[1]
    }
    return acc
}