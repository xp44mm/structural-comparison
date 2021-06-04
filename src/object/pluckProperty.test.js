import { pluckProperty } from './pluckProperty'

describe('pluckProperty from object', () => {
    test('basis array test', () => {
        let x = [0,1]
        let y = pluckProperty(x, [1])
        expect(y).toEqual(1)
    })

    test('basis object test', () => {
        let x = { a: 1 }
        let y = pluckProperty(x, ['a'])
        expect(y).toEqual(1)
    })

    test('nested test', () => {
        let x = { a: [1, 2] }
        let y = pluckProperty(x, ['a', 0])
        expect(y).toEqual(1)
    })

})
