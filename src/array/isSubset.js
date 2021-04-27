import { defaultCompare } from '../comparison'

/**
 * set1 is subset of set2.
 * @param {any[]} set1
 * @param {any[]} set2
 * @param {(any,any)=>number} compare
 */
export function isSubset(set1, set2, compare = defaultCompare) {
    let loop = (a, b) => {
        if (a.length === 0) {
            return true
        } else if (b.length === 0) {
            return false
        } else {
            switch (Math.sign(compare(a[0], b[0]))) {
                case -1:
                    return false
                case 0:
                    return loop(a.slice(1), b.slice(1))
                case 1:
                    return loop(a, b.slice(1))
            }
        }
    }
    return loop(set1, set2)
}
