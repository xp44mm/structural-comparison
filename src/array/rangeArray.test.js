import { rangeArray } from './rangeArray'

//describe block
describe('rangeArray', () => {
    test('rangeArray', () => {
        let y = rangeArray(3)
        expect(y).toEqual([0,1,2])
    })

    test("key no exists", () => {
        let x = []
        expect(x[2]).toEqual(undefined)
    })
})

