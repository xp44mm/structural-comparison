
/**
 * 数组去重，并保持元素的相对顺序。
 * @param {any[]} array
 * @param {(any,any)=>number} equals
 */
export function distinctArray(array, equals = (a, b) => a === b) {
    function loop(resultArray = [], rest) {
        if (rest.length === 0) {
            return resultArray
        } else {
            let [head, ...tail] = rest
            if (resultArray.findIndex(e => equals(head, e)) < 0) {
                return loop([...resultArray, head], tail)
            } else {
                return loop(resultArray, tail)
            }

        }
    }

    try {
        return loop([], array)
    } catch (e) {
        console.error('distinctArray')
    }
}
