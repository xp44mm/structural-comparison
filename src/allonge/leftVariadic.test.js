import { leftGather, leftVariadic } from './leftVariadic'

describe('left', () => {
    test('butLastAndLast', () => {
        const butLastAndLast = leftVariadic((butLast, last) => [butLast, last]);
        let y = butLastAndLast('why', 'hello', 'there', 'little', 'droid')
        expect(y).toEqual([["why", "hello", "there", "little"], "droid"])
    })


    test('left-variadic destructuring', () => {
        const [butLast, last] = leftGather(2)(['why', 'hello', 'there', 'little', 'droid']);
        expect(butLast).toEqual(['why', 'hello', 'there', 'little'])
        expect(last).toEqual('droid')
    })


    
})
