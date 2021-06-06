import { compareKeyPath } from "../comparison"
import { differenceSet } from "../set"
import { intersectDeep } from './intersectDeep'

//export function differenceDeep(keys1, keys2) {
//    return differenceSet(keys1, keys2, compareKeyPath)
//}


export const differenceDeep = keys => deep => {
    let newkeys = differenceSet(deep.keys, keys, compareKeyPath)
    return intersectDeep(newkeys)(deep)
}
