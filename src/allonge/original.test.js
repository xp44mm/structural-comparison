import { original } from './original'

describe('original', () => {

    test('prim', () => {
        let y = original(true)
        expect(y).toEqual(true)


    })
    test('object', () => {
        let y = original(new Boolean(true))
        expect(y).toEqual(true)
    })
})
