import { thunk } from './thunk'

test('thunk test', () => {
    let lazyadd = thunk((a, b) => a + b)
    let y = lazyadd(1, 2)()
    expect(y).toEqual(3)
})
