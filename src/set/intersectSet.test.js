import { intersectSet } from './intersectSet'

describe('intersectSet block', () => {})

test('intersectSet test', () => {
    //输入数组应该排序sort()
    let a = [1, 2]
    let b = [1, 3]
    let c = [1, 2, 3]

    expect(intersectSet(a, b)).toEqual([1])
    expect(intersectSet(a, c)).toEqual(a)
    expect(intersectSet(b, c)).toEqual(b)
})
