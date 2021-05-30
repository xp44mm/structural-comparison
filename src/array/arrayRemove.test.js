import { arrayRemove } from './arrayRemove'

describe('arrayRemove block', () => {

test('arrayRemove test', () => {
    let array = [0, 1, 2, 3]
    arrayRemove(array, 1)
    expect(array.length).toEqual(3)
    expect(array).toEqual([0, 2, 3])

})

})
