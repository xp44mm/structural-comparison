/**
 * remove a element in place
 * @param {any} array
 * @param {any} index
 */
export function arrayRemove(array, index) {
    const len = array.length
    for (let i = index; i < len - 1; i++) {
        array[i] = array[i + 1]
    }

    Reflect.deleteProperty(array, len - 1)
    array.length = len - 1
}