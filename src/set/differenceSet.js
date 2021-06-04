import { defaultCompare } from '../comparison'

/**
 * return set1 - set2
 * @param {any} set1
 * @param {any} set2
 * @param {any} compare
 */
export function differenceSet(set1, set2, compare = defaultCompare) {
    let loop = (acc, a, b) => {
        if (a.length === 0) {
            return acc
        } else if (b.length === 0) {
            return [...acc, ...a]
        } else {
            switch (Math.sign(compare(a[0], b[0]))) {
                case -1:
                    return loop([...acc, a[0]], a.slice(1), b)
                case 0:
                    return loop(acc, a.slice(1), b.slice(1))
                case 1:
                    return loop(acc, a, b.slice(1))
            }
        }
    }
    return loop([], set1, set2)
}
