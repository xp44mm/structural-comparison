import { defaultCompare } from '../comparison'
import { isSubset } from './isSubset'

export function isSuperset(a, b, compare = defaultCompare) {
    return isSubset(b, a, compare)
}
