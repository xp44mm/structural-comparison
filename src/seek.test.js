import { _seek } from './seek'

let branchs = [
    input => typeof input === 'number' ? input : null,
    input => typeof input === "object" ? input : null,
    input => typeof input === 'string' ? input : null,
]

let match = _seek(branchs)

test('matched test', () => {
    let matched = match({})
    expect(matched).toEqual({})
})

test('fallback test', () => {
    let exhaust = match(x => x)
    expect(exhaust).toEqual(null)
})
