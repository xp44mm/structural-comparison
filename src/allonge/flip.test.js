import { flip } from './flip.js'

describe('flip', () => {
    const toarray = (a, b) => [a, b]

    test('non curried', () => {
        let x = toarray(1, 2)
        expect(x).toEqual([1, 2])

        let flipedtoarray = flip(toarray)
        let y = flipedtoarray(1, 2)
        expect(y).toEqual([2, 1])
    })

    test('curried', () => {
        let flipedtoarray = flip(toarray)(1)
        let y = flipedtoarray(2)
        expect(y).toEqual([2, 1])
    })

    
})



