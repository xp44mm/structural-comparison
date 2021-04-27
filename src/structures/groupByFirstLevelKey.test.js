import { groupByFirstLevelKey } from "./groupByFirstLevelKey"

test('empty test', () => {
    expect(groupByFirstLevelKey([])).toEqual([])
})

test('entries test', () => {
    let entries = [
        [[0], '0'],
        [[1], '1'],
    ]
    let y = groupByFirstLevelKey(entries)
    let e = [
        [0, [[[], '0']]],
        [1, [[[], '1']]],
    ]
    expect(y).toEqual(e)
})
