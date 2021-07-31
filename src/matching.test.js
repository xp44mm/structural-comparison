import { matching } from './matching'

let matchers = [
    input => false,
    input => typeof input === "object" ? input : false,
    input => false,
]

test('matched test', () => {
    let matched = matching(matchers, {})
    expect(matched).toEqual({})
})

test('fallback test', () => {
    let exhaust = matching(matchers, 0)
    expect(exhaust).toEqual(null)
})
