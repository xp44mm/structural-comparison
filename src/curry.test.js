import { curry, __ } from 'ramda'

test('curry test', () => {
    let addFourNumbers = (a, b, c, d) => a + b + c + d;
    let curriedAddFourNumbers = curry(addFourNumbers);
    let f = curriedAddFourNumbers(1, 2);
    let g = f(3);
    let y = g(4); //=> 10
    expect(y).toEqual(10)
})

test('placeholder test', () => {
    let fn = (a, b) => a - b
    let ff = curry(fn)
    let fx = ff(__, 2)
    let y = fx(3)
    expect(y).toEqual(1) // 3-2=1

})