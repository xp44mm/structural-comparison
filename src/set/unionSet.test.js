import { unionSet } from './unionSet'

describe('unionSet block', () => {})

test('unions two sets', () => {
    const set1 = ['a', 'b', 'c']
    const set2 = ['b', 'd', 'wow']
    const set3 = unionSet(set1, set2)
    expect(set3).toEqual(['a', 'b', 'c', 'd', 'wow'])
})
