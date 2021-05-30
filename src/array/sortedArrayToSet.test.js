import { sortedArrayToSet } from './sortedArrayToSet'

describe('sortedArrayToSet block', () => {
    test('sortedArrayToSet', () => {
        //输入数组应该用相同的比较函数先排序一遍
        let sortedArray = ['A', 'B', 'B', 'C']
        let y = sortedArrayToSet(sortedArray)
        expect(y).toEqual(['A', 'B', 'C'])
    })
})
