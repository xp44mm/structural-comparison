﻿import { compareKeyPath } from '../comparison'
import { groupByFirstLevelKey } from './groupByFirstLevelKey'
import { isRange } from './isRange'

/*从扁平数据集，建立js对象*/

export function erectObject(flatEntries) {
    //排序为了分组，首次排序后，不需要再排序。
    let collection = flatEntries.sort(([a], [b]) => compareKeyPath(a, b))
    return tojs(collection)
}


/// 假设输入已经排好顺序，按照keyPath。
export function tojs(flatEntries) {
    let entries = groupByFirstLevelKey(flatEntries).map(([k, group]) => {
        /// exhaust match entries with [[[],value]]
        let v =
            group.length === 1 && group[0][0].length === 0
                ? group[0][1]
                : tojs(group)
        return [k, v]
    })

    let keys = entries.map(([k]) => k)
    let obj = Object.fromEntries(entries)
    if (isRange(keys)) {
        return Array.from({ ...obj, length: keys.length })
    } else {
        return obj
    }
}

