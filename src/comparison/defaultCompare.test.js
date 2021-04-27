import { defaultCompare } from './defaultCompare'

describe('Basic usage', () => {
    test('Undefined', () => {
        expect(defaultCompare(undefined, undefined)).toEqual(0)
    })

    test('null', () => {
        expect(defaultCompare(null, null)).toEqual(0)
    })

    test('nan', () => {
        expect(defaultCompare(NaN, NaN)).toEqual(0)
    })

    test('+ Infinity', () => {
        expect(defaultCompare(Infinity, Infinity)).toEqual(0)
    })

    test('- Infinity', () => {
        expect(defaultCompare(- Infinity, - Infinity)).toEqual(0)
    })

})
