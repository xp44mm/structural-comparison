/**
 * insert a element at position in place.
 * @param {any} array
 * @param {any} item
 * @param {any} index
 */
export function arrayInsert(array, item, index) {
    const len = array.length
    for (let i = len; i > index; i--) {
        array[i] = array[i-1]
    }
    array[index] = item
}