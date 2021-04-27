import { unionArray } from './unionArray'
describe('unionArray block', () => {
    it('unions two sets', () => {
        const s1 = ['a', 'b', 'c'].sort()
        const s2 = ['d', 'b', 'wow'].sort()
        const s3 = unionArray(s1, s2)
        expect(s3).toEqual(['a', 'b', 'c', 'd', 'wow'])
    })

})
