import { mapWith } from './mapWith'
import { callRight } from './call'

describe('mapWith', () => {
    test('squaresOf', () => {
        const squaresOf = (list) =>
            list.map(x => x * x);
        let y = squaresOf([1, 2, 3, 4, 5])
        expect(y).toEqual([1, 4, 9, 16, 25])
    })

    test('callRight', () => {
        const map = (list, fn) => list.map(fn);
        const squaresOf = callRight(map, n => n * n);
        let y = squaresOf([1, 2, 3, 4, 5])
        expect(y).toEqual([1, 4, 9, 16, 25])
    })


})

