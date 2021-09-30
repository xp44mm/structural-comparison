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
    console.log([a,b,c,d])
})

