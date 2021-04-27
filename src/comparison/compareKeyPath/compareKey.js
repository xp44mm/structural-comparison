import { defaultCompare } from '../defaultCompare'

///
export function compareKey(k1, k2) {
    let type1 = typeof k1
    let type2 = typeof k2

    if (type1 === type2) {
        return defaultCompare(k1,k2)
    }

    //string > number
    if (type1 === 'string') {
        return 1
    }

    return -1
}
