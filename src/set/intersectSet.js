import { defaultCompare } from '../comparison'

export function intersectSet(set1, set2, compare = defaultCompare) {
    let loop = (acc, a, b) => {
        if (a.length === 0 || b.length === 0) {
            return acc
        } else {
            //每次去掉最大的元素
            switch (Math.sign(compare(a[0], b[0]))) {
                case -1:
                    return loop(acc, a.slice(1), b)

                case 0:
                    return loop([...acc, a[0]], a.slice(1), b.slice(1))

                case 1:
                    return loop(acc, a, b.slice(1))
            }
        }
    }

    return loop([], set1, set2)
}
