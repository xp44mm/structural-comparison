import { differenceSet } from './differenceSet'

describe('differenceSet block', () => {})

test('differenceSet test', () => {
    let a = ['A', 'B', 'C'].sort()
    let b = ['C', 'D', 'E'].sort()

    const s = differenceSet(a, b) // a - b
    expect(s).toEqual(['A', 'B'])
})
