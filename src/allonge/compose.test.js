import { compose,composer } from './compose.js'

describe('compose', () => {
    test('compose zero', () => {
        expect(() => compose()()).toThrow(Error);
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

describe('composer', () => {
    test('composer 0', () => {
        expect(() => composer()()).toThrow(Error);
    })

    test('composer 1', () => {
        let y = composer(5);
        expect(y).toEqual(5)
    })

    test('composer 2', () => {
        let y = composer(x => x + 3, 5);
        expect(y).toEqual(8)
    })


    test('composer 4', () => {
        let paren = x => `(${x})`
        let brack = x => `[${x}]`
        let brace = x => `{${x}}`

        let y = composer(paren, brack, brace, 5);
        expect(y).toEqual('([{5}])')
    })

})
