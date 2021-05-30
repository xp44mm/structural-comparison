import { findIndexFromSet } from './findIndexFromSet'
describe('set ops block', () => {
test('find index', () => {
    let st = ['A', 'B', 'C'].sort()
    expect(findIndexFromSet(st, 'B')).toEqual(1)
    expect(findIndexFromSet(st, 'D')).toEqual(-1)
})
})
