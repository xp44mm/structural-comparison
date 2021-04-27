import { defaultCompare } from "../comparison"

/**
 * 同Array.findIndex，返回元素在集合中的索引位置
 * @param {any[]} set Array.sort(compare)后的Array
 * @param {any} e 是要查找的元素
 * @param {(any,any)=>number} compare 元素的比较函数
 */
export function findIndexFromSet(set, e, compare = defaultCompare) {
    let loop = (i, st) => {
        if (st.length === 0) {
            return -1
        } else {
            switch (Math.sign(compare(st[0], e))) {
                case -1:
                    return loop(i + 1, st.slice(1))

                case 0:
                    return i

                case 1:
                    return -1
            }
        }
    }

    return loop(0, set)
}
