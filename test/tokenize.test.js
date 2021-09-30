import { tokenize } from './tokenize'
import { extractNumbers } from './extractNumbers'
import { addNumbers } from './addNumbers'
import { logAndYield } from './logAndYield'

test('tokenization', () => {
    let x = [...tokenize('2 apples and 5 oranges.')]
    let y = ['2', 'apples', 'and', '5', 'oranges']
    expect(x).toEqual(y)
})

test('extractNumbers', () => {
    let x = [...extractNumbers(['hello', '123', 'world', '45'])]
    let y = [123, 45]
    expect(x).toEqual(y)
})

test('addNumbers', () => {
    let x = [...addNumbers([5, -2, 12])]
    let y = [5, 3, 15]
    expect(x).toEqual(y)
})

test('22.6.2.1.4 Pulling the output', () => {
    const CHARS = '2 apples and 5 oranges.'
    const CHAIN = addNumbers(extractNumbers(tokenize(CHARS)))
    let outp = [2, 7]
    expect([...CHAIN]).toEqual(outp)

})

test('test', () => {
    const CHARS = '2 apples and 5 oranges.'
    const CHAIN2 = logAndYield(addNumbers(extractNumbers(tokenize(logAndYield(CHARS)))), '-> ');
    [...CHAIN2]

})

// Output:
// 2
//  
// -> 2
// a
// p
// p
// l
// e
// s
//  
// a
// n
// d
//  
// 5
//  
// -> 7
// o
// r
// a
// n
// g
// e
// s
// .
