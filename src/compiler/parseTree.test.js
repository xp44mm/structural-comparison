import { token, rightside } from './parseTree'
import { cond } from '../ramda/cond'

describe('cond', () => {
    test('test patial curry', () => {
        let translate = cond([
            [rightside(token('LBRACK'), token('RBRACK')), children => ({ fixedArray: [] })],
            [rightside(token('LBRACK'), token('ELLIPSIS'), token('RBRACK')), children => ({ variadicArray: [[], []] })],
        ])

        let input1 = { leftside: 'array', children: [{ token: 'LBRACK' }, { token: 'RBRACK' }] }

        let y1 = translate(input1.children)
        expect(y1).toEqual({ fixedArray: [] })
        let input2 = { leftside: 'array', children: [{ token: 'LBRACK' }, { token: 'ELLIPSIS' }, { token: 'RBRACK' }] }
        let y2 = translate(input2.children)
        expect(y2).toEqual({ variadicArray: [[], []] })


    });
});
