import { sortedArrayToSet } from './sortedArrayToSet'
describe('sortedArrayToSet block', () => {
    test('sortedArrayToSet', () => {
        //输入数组应该用相同的比较函数先排序一遍
        let st = ['A', 'B', 'C', 'B'].sort()
        expect(sortedArrayToSet(st)).toEqual(['A', 'B', 'C'])
    })
})
