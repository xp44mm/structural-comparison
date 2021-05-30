import { differenceArray } from "../array";
import { compareKeyPath } from "../comparison";

export function differenceDeep(keys1, keys2) {
    return differenceArray(keys1, keys2, compareKeyPath)
}