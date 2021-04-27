import { defaultCompare } from '../comparison'

/**
 * 数组去重，排序好后的数组去重。
 * @param {any[]} set
 * @param {(any,any)=>number} compare
 */
export function sortedArrayToSet(set, compare = defaultCompare) {
    function loop(acc, st) {
        if (st.length === 0) {
            return acc
        } else {
            switch (Math.sign(compare(acc[acc.length - 1], st[0]))) {
                case -1:
                    return loop([...acc, st[0]], st.slice(1))

                case 0:
                    return loop(acc, st.slice(1))

                case 1:
                    throw new Error('sort ascent')
            }
        }
    }

    try {
        if (set.length === 0) {
            return []
        } else {
            return loop([set[0]], set.slice(1))
        }
    } catch (e) {
        console.error('sortedArrayToSet()')
    }
}
