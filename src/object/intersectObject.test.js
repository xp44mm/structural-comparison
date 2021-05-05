import { intersectObject } from './intersectObject'

test('pickObject test', () => {
    let obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5
    }

    let y = intersectObject(obj, ['a', 'd', 'e'])

    expect(y).toEqual({ a: 1, d: 4, e: 5 })

})
