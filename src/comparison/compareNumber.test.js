import { compareNumber } from './compareNumber'

describe('Basic usage', () => {
    test('nan', () => {
        expect(compareNumber(NaN, NaN)).toEqual(0)
    })

    test('nan Infinity', () => {
        expect(compareNumber(NaN, Infinity)).toEqual(1)
        expect(compareNumber(NaN, 0n)).toEqual(1)

    })

    test('Infinity bigint', () => {
        expect(compareNumber(Infinity, 0n)).toEqual(1)
        expect(compareNumber(-Infinity, 0n)).toEqual(-1)
    })



})
