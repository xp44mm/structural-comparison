import { compareKey } from './compareKey'

describe('compare key', () => {
    test('number compare', () => {
        expect(compareKey(1, 2)).toEqual(-1)
        expect(compareKey(2, 2)).toEqual(0)
        expect(compareKey(2, 1)).toEqual(1)
    })

    test('string compare', () => {
        expect(compareKey("80", "9")).toEqual(-1)
        expect(compareKey('80', '80')).toEqual(0)
        expect(compareKey('9', '80')).toEqual(1)
    })

    test('number string compare', () => {
        expect(compareKey(1, 'x')).toEqual(-1)
        expect(compareKey('x', 1)).toEqual(1)
    })

})
