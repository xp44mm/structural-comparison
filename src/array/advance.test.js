import { advance } from './advance'

describe('advance', () => {

    test('advance test', () => {
        let ls = [1, 2, 3, 4, 5]
        let y = advance(2, ls)
        let res = [[2, 1], [3, 4, 5]]
        expect(y).toEqual(res)
    })

})
