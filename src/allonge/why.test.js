import { why } from './why.js'
import { memoized } from '../recursivecombinators/memoized'

describe('why', () => {
    test('basis', () => {
        const _map =
            why((myself, fn, input) => {
                if (input.length === 0) {
                    return [];
                } else {
                    let [first, ...rest] = input;
                    return [fn(first), ...myself(fn, rest)];
                }
            });

        let y = _map(x => x * x, [1, 2, 3])
        expect(y).toEqual([1, 4, 9])

    })

    const _isEven = (myself, n) =>
        (n === 0) || !myself(n - 1);


    test('isEven', () => {
        const isEven = why(_isEven);

        let y1 = isEven(1000)
        //=> Go for coffee,
        //   then return to find out that the answer is `true`
        expect(y1).toEqual(true)

        let y2 = isEven(1001)
        //=> Go for another coffee,
        //   then return to find out that the answer is `false`
        expect(y2).toEqual(false)
    })

    test('isEvenFast', () => {
        const ignoreFirst = ([_, ...values]) => values[0];

        //they can be easily composed with decorators
        const isEvenFast = why(memoized(_isEven, ignoreFirst));

        let y1 = isEvenFast(1000)
        //=> Go for coffee,
        //   then return to find out that the answer is `true`
        expect(y1).toEqual(true)

        let y2 = isEvenFast(1001)
        //=> false, immediately
        expect(y2).toEqual(false)

    })

})



