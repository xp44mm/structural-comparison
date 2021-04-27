import { zipArray } from "../array"
import { Deep } from './Deep'

/**
 * 新值替换旧值：[keyPath,`oldValue`] -> [keyPath,`value`]，返回新的Deep對象
 * @param {any} values
 */
export const replaceValueDeep = (values) => (deep) => {
    let entries = zipArray(deep.keys, values)
    return new Deep(entries)
}

