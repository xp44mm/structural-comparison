import { memoizeWith } from 'ramda'
import { Y } from './Y.js'


describe('Y Combinator', () => {
    test('basis', () => {
        const Factorial = Y(factorial => n => n < 2 ? 1 : n * factorial(n - 1))
        let y = Factorial(10);
        expect(y).toEqual(3628800)

        // let z = Factorial(9999)
        // expect(z).toEqual(Infinity)

    })

    test('naive', () => {
        let fact = n => {
            let loop = (x, n) => n === 0 ? x : loop(n * x, n - 1)
            return loop(1, n)
        }
        let y = fact(10);
        expect(y).toEqual(3628800)

        let z = fact(9999)
        expect(z).toEqual(Infinity)

    })

    // let Factorial2 = Y(factorial => n => {
    //     let fact = thunk((x, n) => n === 0 ? x : factorial(n * x, n - 1))
    //     return trampoline(fact(1, n))
    // })


    // test('normal', () => {
    //     let y = Factorial2(10)
    //     expect(y).toEqual(3628800)
    // })

    // test('big', () => {
    //     let y = Factorial2(9999)
    //     expect(y).toEqual(Infinity)
    // })


})


describe('Memoization', () => {
    // test('big', () => {
    //     let y = Factorial2(9999)
    //     expect(y).toEqual(Infinity)
    // })

    test('memoizeWith', () => {
        let count = 0
        const factorial = memoizeWith(Number, n => {
            let loop = (x, n) => n === 0 ? x : loop(n * x, n - 1)
            count += 1
            return loop(1, n)
        });
        factorial(5); //=> 120
        factorial(5); //=> 120
        factorial(5); //=> 120
        count; //=> 1

        let y = factorial(5)
        expect(y).toEqual(120)
        expect(count).toEqual(1)

    })

})
