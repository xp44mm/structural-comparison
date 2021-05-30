import { defaultCompare } from '../defaultCompare'

///
export function compareKey(a, b) {
    let type1 = typeof a
    let type2 = typeof b

    if (type1 === type2) {
        return defaultCompare(a,b)
    }

    //string > number
    if (type1 === 'string') {
        return 1
    }

    return -1
}
