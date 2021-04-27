import { isSuperset } from './isSuperset'
import { compareKeyPath } from '../comparison'

describe('isSuperset block', () => {
    test('isSuperset test', () => {
        let a = [1, 2]
        let b = [1, 3]
        let c = [1, 2, 3]

        expect(isSuperset(a, [...a])).toEqual(true)
        expect(isSuperset(a, b)).toEqual(false)
        expect(isSuperset(c, a)).toEqual(true)
    })

    test('isSuperset keypath test', () => {
        let a = [[1, 2], ['a', 'b'], [3, 'x']]
        let b = [[1, 2], ['a', 'b']]

        expect(isSuperset(a, b, compareKeyPath)).toEqual(true)
    })
})
