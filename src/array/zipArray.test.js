import { zipArray } from './zipArray'

describe('zipArray array ops', () => {
    test('eq test', () => {
        expect(zipArray([1, 2, 3], ['a', 'b', 'c'])).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
    })
    test('gt test', () => {
        expect(zipArray([1, 2, 3, 4], ['a', 'b', 'c'])).toEqual([[1, 'a'], [2, 'b'], [3, 'c'], [4, undefined]])
    })
    test('lt test', () => {
        expect(zipArray([1, 2, 3], ['a', 'b', 'c', 'd'])).toEqual([[1, 'a'], [2, 'b'], [3, 'c'], [undefined, 'd']])
    })
})
