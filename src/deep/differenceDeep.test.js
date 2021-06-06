import { differenceDeep } from './differenceDeep'
import { Deep } from './Deep'

test('differenceDeep test', () => {
    let dp = new Deep([
        [[0], 0], 
        [[1], 1]
        ])
    let keys = [[1], [2]]
    let y = dp |> differenceDeep(keys)
    expect(y.entries).toEqual([[[0], 0]])
})
