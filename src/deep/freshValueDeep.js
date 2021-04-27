import { extractProperty } from '../object'
import { Deep } from './Deep'

/**
 * ���¶�������ȡֵ
 * @param {any} obj
 */
export const freshValueDeep = (obj) => (deep) => {
    let entries = deep.keys.map(k => [k, extractProperty(obj, k)])
    return new Deep(entries)
}
