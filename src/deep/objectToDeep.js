import { flat } from '../structures'
import { compareEntries } from "./compareEntries"
import { Deep } from "./Deep"

/**
 * from plain Object to Deep
 * @param {Object} obj
 * @param {function} filter
*/
export function objectToDeep(obj, filter) {
    let entries = flat(obj, filter).sort(compareEntries)
    return new Deep(entries)
}
