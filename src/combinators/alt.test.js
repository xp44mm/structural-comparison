import { alt } from './alt'

let branchs = [
    input => typeof input === 'number' ? input : null,
    input => typeof input === "object" ? input : null,
    input => typeof input === 'string' ? input : null,
]

let match = alt(branchs)

test('matched test', () => {
    let matched = match({})
    expect(matched).toEqual({})
})

test('fallback test', () => {
    let exhaust = match(x => x)
    expect(exhaust).toEqual(null)
})
