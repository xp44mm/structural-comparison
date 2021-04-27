import { defaultCompare } from "../comparison"

export function groupArrayBy(array, getKey, compareKey = defaultCompare) {
    if (array.length === 0) {
        return []
    }

    let sortedEntries = array
        .map(e => [getKey(e), e])
        .sort(([ka], [kb]) => compareKey(ka, kb))

    return groupSortedEntries(sortedEntries, compareKey)
}

export function groupSortedEntries(sortedEntries, compareKey) {
    return sortedEntries.reduce(
        (groups, [k, v]) => {
            let [k0, group] = groups[groups.length - 1]
            if (compareKey(k0, k) === 0) {
                group.push(v)
            } else {
                groups.push([k, [v]])
            }
            return groups
        },
        [[sortedEntries[0][0], []]]
    )

}

