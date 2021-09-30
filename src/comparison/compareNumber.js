import { defaultCompare } from './defaultCompare'

/**
 * 可以比较NaN,Infinity,number,bigint
 * @param {number|bigint} a
 * @param {number|bigint} b
 */
export function compareNumber(a, b) {
    if (Number.isNaN(a) && Number.isNaN(b)) {
        return 0
    }

    //NaN最大
    if (Number.isNaN(a)) {
        return 1
    }

    if (Number.isNaN(b)) {
        return -1
    }

    return defaultCompare(a, b)

}



