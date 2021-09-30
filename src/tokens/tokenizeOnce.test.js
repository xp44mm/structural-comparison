import { tokenizeOnce } from "./tokenizeOnce"

test("tryWhitespace test", () => {
    let x = " "
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token:{WHITESPACE: ' '}, restInput: "" })
})

test("tryEllipsis test", () => {
    let x = "..."
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: 'ELLIPSIS', restInput: "" })
})

test("tryIdentifier test", () => {
    let x = "xyz"
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: {IDENTIFIER:"xyz"}, restInput: "" })
})

test("tryNumber test", () => {
    let x = "1.2"
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: {NUMBER:1.2}, restInput: "" })
})

test("tryQuote test", () => {
    let x = '""'
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: {QUOTE:""}, restInput: "" })
})

test("LBRACE test", () => {
    let x = '{'
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: 'LBRACE', restInput: "" })
})

test("RBRACE test", () => {
    let x = '}'
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: 'RBRACE', restInput: "" })
})

test("LBRACK test", () => {
    let x = '['
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: 'LBRACK', restInput: "" })
})

test("RBRACK test", () => {
    let x = ']'
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: 'RBRACK', restInput: "" })
})

test("BAR test", () => {
    let x = '|'
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: 'BAR', restInput: "" })
})

test("COMMA test", () => {
    let x = ','
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: 'COMMA', restInput: "" })
})

test("COLON test", () => {
    let x = ':'
    let y = tokenizeOnce(x)
    expect(y).toEqual({ token: 'COLON', restInput: "" })
})




