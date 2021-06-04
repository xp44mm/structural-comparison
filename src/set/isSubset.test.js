import { isSubset } from './isSubset'
import { compareKeyPath } from '../comparison'

describe('isSubset block', () => {
    test('isSubset test', () => {
        let a = [1, 2]
        let b = [1, 3]
        let c = [1, 2, 3]

        expect(isSubset(a, [...a])).toEqual(true)
        expect(isSubset(a, b)).toEqual(false)
        expect(isSubset(a, c)).toEqual(true)
    })

    test('isSubset keypath test', () => {
        let a = [[1, 2], ['a', 'b']]
        let b = [[1, 2], ['a', 'b'], [3, 'x']]

        expect(isSubset(a, b, compareKeyPath)).toEqual(true)
    })
})
