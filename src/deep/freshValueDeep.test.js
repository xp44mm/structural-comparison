import { Deep } from './Deep'
import { freshValueDeep } from './freshValueDeep'

test('freshValueDeep', () => {
    let entries = [[['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]

    let deep = new Deep(entries)
    let obj = {
        a: 5,
        b: 6,
        c: [
            7,
            8,
            {
                e: 9,
            },
        ],
    }

    let y = deep |> freshValueDeep(obj)
    let e = [[['a'], 5], [['b'], 6], [['c', 0], 7], [['c', 1], 8], [['c', 2, 'e'], 9]]

    expect(y.entries).toEqual(e)
})
