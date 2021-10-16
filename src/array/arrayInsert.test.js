import { arrayInsert } from './arrayInsert'

describe('arrayInsert block', () => {

    test('arrayInsert test', () => {
        let array = [0, 1, 2, 3]
        arrayInsert(array, '1', 1)

        expect(array).toEqual([0, '1', 1, 2, 3])
        expect(array.length).toEqual(5)
    })

})
