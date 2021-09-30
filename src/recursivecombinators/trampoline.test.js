import { thunkify } from 'ramda'
import { trampoline } from './trampoline'

describe('old', () => {
    test('factorial', () => {
        var factorial = function (n) {
            var _fact = thunkify(function (x, n) {
                if (n == 0) {
                    // base case
                    return x
                } else {
                    // recursive case
                    return _fact(n * x, n - 1)
                }
            })
            return trampoline(_fact(1, n))
        }
        let y = factorial(10)
        expect(y).toEqual(3628800)
    })

    test('sum very large number test', () => {
        const sum = n => {
            const loop = thunkify((n, prevSum = 0) => {
                if (n <= 1) return n + prevSum
                return loop(n - 1, n + prevSum)
            })
            return trampoline(loop(n, 0))
        }

        let y = sum(1000000) // 不会栈溢出
        expect(y).toEqual(500000500000)
    })

    test('mutural test', () => {

        let _isEven = thunkify(function (n) {
            if (n === 0)
                return true
            else {
                let n1 = Math.abs(n) - 1
                return _isOdd(n1)
            }
        })

        let _isOdd = thunkify(function (n) {
            if (n === 0)
                return false
            else {
                let n1 = Math.abs(n) - 1
                return _isEven(n1)
            }
        })

        let isEven = n => {
            return trampoline(_isEven(n))
        }

        let isOdd = n => {
            return trampoline(_isOdd(n))
        }

        expect(isOdd(2000001)).toEqual(true)
        expect(isEven(2000001)).toEqual(false)

    })
})
