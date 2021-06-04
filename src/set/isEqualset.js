import { defaultCompare } from '../comparison'

/**
 * Two sets, P and Q, are equal sets if they have exactly the same members.
 * @param {any[]} set1
 * @param {any[]} set2
 * @param {any} compare
 */
export function isEqualset(set1, set2, compare = defaultCompare) {
    let loop = (a, b) => {
        if (a.length === 0 && b.length === 0) {
            return true
        }

        if (a.length > 0 && b.length > 0) {
            let [a0, ...aa] = a
            let [b0, ...bb] = b
            if (compare(a0, b0) === 0) {
                return loop(aa, bb)
            } else {
                return false
            }
        }

        return false
    }
    return loop(set1, set2)
}
