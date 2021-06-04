import { findIndexInSet } from './findIndexInSet'
describe('set ops block', () => {})
test('find index', () => {
    let st = ['A', 'B', 'C'].sort()
    expect(findIndexInSet(st, 'B')).toEqual(1)
    expect(findIndexInSet(st, 'D')).toEqual(-1)
})
