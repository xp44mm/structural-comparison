import { defaultCompare } from '../comparison'

/**
 * 数组去重，排序好后的数组去重。
 * @param {any[]} sortedArray
 * @param {(any,any)=>number} compare
 */
export function sortedArrayToSet(sortedArray, compare = defaultCompare) {
    function loop(acc, sarray) {
        if (sarray.length === 0) {
            return acc
        } else {
            switch (Math.sign(compare(acc[acc.length - 1], sarray[0]))) {
                case -1:
                    return loop([...acc, sarray[0]], sarray.slice(1))

                case 0:
                    return loop(acc, sarray.slice(1))

                case 1:
                    throw new Error('sort ascent')
            }
        }
    }

    try {
        if (sortedArray.length === 0) {
            return []
        } else {
            return loop([sortedArray[0]], sortedArray.slice(1))
        }
    } catch (e) {
        console.error('sortedArrayToSet()')
    }
}
