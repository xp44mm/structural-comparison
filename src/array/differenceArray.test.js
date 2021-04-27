import { differenceArray } from './differenceArray'
describe('differenceArray block', () => {

    test('differenceArray test', () => {
        let a = ['A', 'B', 'C'].sort()
        let b = ['C', 'D', 'E'].sort()

        const s = differenceArray(a,b) // a - b
        expect(s).toEqual(['A', 'B'])
    })

})
