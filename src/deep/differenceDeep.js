import { differenceSet } from "../set";
import { compareKeyPath } from "../comparison";

export function differenceDeep(keys1, keys2) {
    return differenceSet(keys1, keys2, compareKeyPath)
}