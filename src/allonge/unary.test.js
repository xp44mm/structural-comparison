import { unary } from './unary.js'

describe('unary', () => {
    test('without unary', () => {
        let y = ['1', '2', '3'].map((parseInt))
        expect(y).toEqual([1, NaN, NaN])
    })

    test('unary', () => {
        let y = ['1', '2', '3'].map(unary(parseInt))
        expect(y).toEqual([1, 2, 3])
    })
})

