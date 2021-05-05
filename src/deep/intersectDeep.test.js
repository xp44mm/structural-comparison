import { Deep } from './Deep'
import { intersectDeep } from './intersectDeep'

test('test intersectDeep', () => {
    let entries = [[[0, 0], 0], [[0, 1], 1], [[1, 0], 2], [[1, 1], 3]]
    let x = new Deep(entries)

    let keys = [[0, 0], [1, 1]]

    let y = x |> intersectDeep(keys)

    let e = [[[0, 0], 0], [[1, 1], 3]]

    expect(y.entries).toEqual(e)
})
