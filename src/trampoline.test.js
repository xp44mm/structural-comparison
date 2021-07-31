import { trampoline } from './trampoline'

test('basis test', () => {
    const sumRecursive = (n, prevSum = 0) => {
        if (n <= 1) return n + prevSum
        return () => sumRecursive(n - 1, n + prevSum)
    }

    const sum = trampoline(sumRecursive)

    let y = sum(1000000)// 不会栈溢出
    expect(y).toEqual(500000500000)
})
