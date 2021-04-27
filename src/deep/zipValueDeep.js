import { Deep } from './Deep'

///旧值后面附加新值对照：[keyPath,`oldValue`] -> [keyPath,[`oldValue`,`value`]]，
///返回新的Deep對象
export const zipValueDeep = values => deep => {
    let entries = deep.entries.map(([k, v], i) => [k, [v, values[i]]])
    return new Deep(entries)
}
