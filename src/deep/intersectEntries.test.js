import { intersectEntries } from './intersectEntries'

test('test intersectEntries', () => {
    let x = [[[0, 0], 0], [[0, 1], 1], [[1, 0], 2], [[1, 1], 3]]

    let keys = [[0, 0], [1, 1]]

    let y = intersectEntries(x, keys)

    let e = [[[0, 0], 0], [[1, 1], 3]]

    expect(y).toEqual(e)
})
