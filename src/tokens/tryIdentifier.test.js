import { tryIdentifier } from "./tryIdentifier"

test("tryIdentifier null test", () => {
    let x = "null "
    let y = tryIdentifier(x)
    expect(y).toEqual({ token: 'NULL', restInput: " " })
})

test("tryIdentifier BOOL test", () => {
    let x = "true "
    let y = tryIdentifier(x)
    expect(y).toEqual({ token: { BOOLEAN: true }, restInput: " " })
})

test("tryIdentifier TYPE test", () => {
    let x = "string "
    let y = tryIdentifier(x)
    expect(y).toEqual({ token: { TYPE: 'string' }, restInput: " " })
})

test("tryIdentifier IDENT test", () => {
    let x = "xyz "
    let y = tryIdentifier(x)
    expect(y).toEqual({ token: { IDENTIFIER: 'xyz' }, restInput: " " })
})


