import { Deep } from './Deep'
import { zipValueDeep } from './zipValueDeep'

test('zipValueDeep', () => {
    let entries = [
        [['a'], 0], 
        [['b'], 1], 
        [['c', 0], 2], 
        [['c', 1], 3], 
        [['c', 2, 'e'], 4]]
    let deep = new Deep(entries)
    let values = [5, 6, 7, 8, 9]
    let y = deep |> zipValueDeep(values)
    let e = [
        [['a'], [0, 5]], 
        [['b'], [1, 6]], 
        [['c', 0], [2, 7]], 
        [['c', 1], [3, 8]], 
        [['c', 2, 'e'], [4, 9]]]
    expect(y.entries).toEqual(e)
})
