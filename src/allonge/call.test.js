import { callFirst, callLast, callLeft, callRight } from './call.js'

describe('Partial Application', () => {
    const greet = (me, you) =>
        `Hello, ${you}, my name is ${me}`;

    test('callFirst', () => {
        const heliosSaysHello = callFirst(greet, 'Helios');
        let y = heliosSaysHello('Eartha')
        expect(y).toEqual('Hello, Eartha, my name is Helios')

    })

    test('callLast', () => {
        const sayHelloToCeline = callLast(greet, 'Celine');
        let y = sayHelloToCeline('Eartha')
        expect(y).toEqual('Hello, Celine, my name is Eartha')
    })

    const printdate = (y, m, d) =>
        `${y}year${m}month${d}day`;

    test('callLeft', () => {
        const fn = callLeft(printdate, 1996, 8);
        let y = fn(31)
        expect(y).toEqual(`1996year8month31day`)
    })

    test('callRight', () => {
        const fn = callRight(printdate, 8, 31);
        let y = fn(1996)
        expect(y).toEqual(`1996year8month31day`)
    })
})
