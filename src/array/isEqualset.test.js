import { compareKeyPath } from '../comparison'
import { isEqualset } from './isEqualset'

describe('set ops block', () => {
test('isEqualset test', () => {
    let a = [1, 2]
    let b = [1, 3]
    let c = [1, 2, 3]

    expect(isEqualset(a, [...a])).toEqual(true)
    expect(isEqualset(a, b)).toEqual(false)
    expect(isEqualset(a, c)).toEqual(false)
    expect(isEqualset(b, c)).toEqual(false)
})

    test('isequal keypath test', () => {
        let a = [[1, 2], ['a', 'b']]
        let b = [[1, 2], ['a', 'b']]

        expect(isEqualset(a, b, compareKeyPath)).toEqual(true)
    })
})
