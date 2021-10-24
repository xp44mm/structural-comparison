import { Deep } from './Deep'
import { replaceValueDeep } from './replaceValueDeep'

test('replaceValueDeep', () => {
    let entries = [
        [['a'], 0],
        [['b'], 1],
        [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]

    let deep = new Deep(entries)

    let values = [5, 6, 7, 8, 9]

    let y = replaceValueDeep(values)(deep)
    let e = [
        [['a'], 5],
        [['b'], 6],
        [['c', 0], 7], [['c', 1], 8], [['c', 2, 'e'], 9]]

    expect(y.entries).toEqual(e)
})
