import { tokenize } from './tokenize'

test('tokenize many tokens test', () => {
    let x = '(7+3)*2'
    let y = [...tokenize(x)]
    expect(y).toEqual(['(', { DIGIT: 7 }, '+', { DIGIT: 3 }, ')', '*', { DIGIT: 2 },])
})

