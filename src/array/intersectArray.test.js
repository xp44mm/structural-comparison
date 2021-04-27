import { intersectArray } from './intersectArray'
describe('intersectArray block', () => {
    test('intersectArray test', () => {
        //输入数组应该排序sort()
        let a = [1, 2]
        let b = [1, 3]
        let c = [1, 2, 3]

        expect(intersectArray(a, b)).toEqual([1])
        expect(intersectArray(a, c)).toEqual(a)
        expect(intersectArray(b, c)).toEqual(b)
    })
})
