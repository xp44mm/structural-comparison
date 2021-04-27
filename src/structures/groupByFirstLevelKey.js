import { groupSortedEntries } from '../array/groupArrayBy'
import { compareKey } from '../comparison'

//为了节约内存，从groupArrayBy修改
export function groupByFirstLevelKey(flatEntries) {
    if (flatEntries.length === 0) {
        return []
    }

    let sortedKvPairs = flatEntries
        .map(([[key, ...keyPath], value]) => [key, [keyPath, value]])

    return groupSortedEntries(sortedKvPairs, compareKey)
}
