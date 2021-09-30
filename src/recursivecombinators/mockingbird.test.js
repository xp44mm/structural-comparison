import { mockingbird } from './mockingbird.js'
import { memoized } from './memoized.js'

describe('mockingbird', () => {
    let _exponent = (myself, x, n) => {
        if (n === 0) {
            return 1;
        } else if (n % 2 === 1) {
            return x * myself(myself, x * x, Math.floor(n / 2));
        } else {
            return myself(myself, x * x, n / 2);
        }
    };

    test('mockingbird', () => {
        let exponent = mockingbird(_exponent)
        let y = exponent(2, 8)
        expect(y).toEqual(256)
    })

    test('memoized', () => {
        let ignoreFirst = ([_, ...values]) => JSON.stringify(values);
        let exponent = mockingbird(memoized(_exponent, ignoreFirst))
        let y = exponent(2, 8)
        expect(y).toEqual(256)
    })



})
