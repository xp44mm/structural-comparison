import { mapWith } from './mapWith'
import { maybe } from './maybe'

describe('mapWith', () => {
    test('squaresOf', () => {
        const squaresOf = mapWith((n) => n * n);
        let y = squaresOf([1, 2, 3, 4, 5])
        expect(y).toEqual([1, 4, 9, 16, 25])
    })
    test(' partial application is orthogonal to composition', () => {
        const safeSquareAll = mapWith(maybe((n) => n * n));
        let y = safeSquareAll([1, null, 2, 3])
        //=> 
        expect(y).toEqual([1, undefined, 4, 9])
    })

})

