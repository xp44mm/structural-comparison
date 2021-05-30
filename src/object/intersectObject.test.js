import { intersectObject } from './intersectObject'

test('pickObject test', () => {
    let obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    let keys = ['a', 'd', 'e']
    let y = intersectObject(obj, keys)
    expect(y).toEqual({ a: 1, d: 4, e: 5 })
})
