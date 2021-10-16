import { why } from './why.js'
import { memoized } from './memoized.js'

describe('memoized', () => {

    test('memoized', () => {
        let arr = []
        const _factorial = (myself, n) => {
            arr.push(n)
            return n < 2 ? 1 : n * myself(n - 1)
        }


        const ignoreFirst = ([_, ...values]) => values[0];

        //they can be easily composed with decorators
        const factorial = why(memoized(_factorial, ignoreFirst));

        let y1 = factorial(5)
        expect(y1).toEqual(120)

        let y2 = factorial(6)
        expect(y2).toEqual(720)

        expect(arr).toEqual([5, 4, 3, 2, 1, 6])

    })

})



