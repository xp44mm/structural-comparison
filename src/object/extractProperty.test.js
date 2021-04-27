import { extractProperty } from './extractProperty'

describe('extractProperty from object', () => {
    test('basis array test', () => {
        let x = [0,1]
        let y = extractProperty(x, [1])
        expect(y).toEqual(1)
    })

    test('basis object test', () => {
        let x = { a: 1 }
        let y = extractProperty(x, ['a'])
        expect(y).toEqual(1)
    })

    test('nested test', () => {
        let x = { a: [1, 2] }
        let y = extractProperty(x, ['a', 0])
        expect(y).toEqual(1)
    })

})
