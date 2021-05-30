import { defaultCompare } from '../comparison'

export function unionArray(set1, set2, compare = defaultCompare) {
    let loop = (acc, a, b) => {
        if (a.length === 0) {
            return [...acc, ...b]
        } else if (b.length === 0) {
            return [...acc, ...a]
        } else {
            switch (Math.sign(compare(a[0], b[0]))) {
                case -1:
                    return loop([...acc, a[0]], a.slice(1), b)
                case 0:
                    return loop([...acc, a[0]], a.slice(1), b.slice(1))
                case 1:
                    return loop([...acc, b[0]], a, b.slice(1))
            }
        }
    }
    return loop([], set1, set2)
}

