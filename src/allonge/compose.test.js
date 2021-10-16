import { compose } from './compose.js'

describe('compose', () => {
    test('compose zero', () => {
        const i = compose()
        let y = i(2)
        expect(y).toEqual(2)
    })

    const addOne = (number) => number + 1;
    const double = (number) => number * 2;

    test('compose', () => {
        const setter = compose(addOne, double);
        let y = setter(2)
        expect(y).toEqual(5)
    })

    let plus = (a, b) => a + b
    let paren = x => `(${x})`
    let brack = x => `[${x}]`
    let brace = x => `{${x}}`

    test('compose complex', () => {
        const setter = compose(paren, brack, brace, plus);
        let y = setter(2, 3)
        expect(y).toEqual('([{5}])')
    })



})
