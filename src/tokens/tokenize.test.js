import { tokenize } from './tokenize'

test('tokenize test', () => {
    let x = '   ...rest'
    let y = [...tokenize(x)]
    expect(y).toEqual(['ELLIPSIS', { IDENTIFIER: 'rest' }])
})

test('iterator usage test', () => {
    let x = '   ...rest'
    let iterator = tokenize(x)
    let a = iterator.next()
    let b = iterator.next()
    let c = iterator.next()
    let d = iterator.next()
    let res = [
        { value: 'ELLIPSIS', done: false },
        { value: { IDENTIFIER: 'rest' }, done: false },
        { value: undefined, done: true },
        { value: undefined, done: true }
    ]
    expect(res).toEqual([a, b, c, d])
})

