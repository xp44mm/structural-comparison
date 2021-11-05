import { pipeline, pipe } from './pipeline.js'

describe('pipeline', () => {
    const addOne = (number) => number + 1;
    const double = (number) => number * 2;

    test('pipeline', () => {
        const setter = pipeline(addOne, double);
        let y = setter(2)
        expect(y).toEqual(6)
    })

    let plus = (a, b) => a + b
    let paren = x => `(${x})`
    let brack = x => `[${x}]`
    let brace = x => `{${x}}`

    test('pipeline complex', () => {
        const setter = pipeline(plus, paren, brack, brace);
        let y = setter(2, 3)
        expect(y).toEqual('{[(5)]}')
    })

})

describe('pipe', () => {
    test('pipe 0', () => {
        expect(() => pipe()).toThrow(Error)
    })

    test('pipe 1', () => {
        let y = pipe(3)
        expect(y).toEqual(3)
    })

    let paren = x => `(${x})`
    let brack = x => `[${x}]`
    let brace = x => `{${x}}`

    test('pipe 4', () => {
        let y = pipe(5, paren, brack, brace)
        expect(y).toEqual('{[(5)]}')
    })

})

