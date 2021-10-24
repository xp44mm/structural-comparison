import { tokenize } from './tokenize'

test('BAR test', () => {
    let x = "|"
    let y = tokenize(x).next().value
    let token = 'BAR'
    expect(y).toEqual(token)
})

test('COMMA test', () => {
    let x = ","
    let y = tokenize(x).next().value
    let token = 'COMMA'
    expect(y).toEqual(token)
})

test('COLON test', () => {
    let x = ":"
    let y = tokenize(x).next().value
    expect(y).toEqual('COLON')
})

// | LBRACK   -> "["
// | RBRACK   -> "]"
test('LBRACK test', () => {
    let x = "["
    let y = tokenize(x).next().value
    expect(y).toEqual('LBRACK')
})

test('RBRACK test', () => {
    let x = "]"
    let y = tokenize(x).next().value
    expect(y).toEqual('RBRACK')
})

// | LBRACE   -> "{"
test('LBRACE test', () => {
    let x = "{"
    let y = tokenize(x).next().value
    expect(y).toEqual('LBRACE')
})

// | RBRACE   -> "}"
test('RBRACE test', () => {
    let x = "}"
    let y = tokenize(x).next().value
    expect(y).toEqual('RBRACE')
})

// | ELLIPSIS -> "..."
test('ELLIPSIS test', () => {
    let x = "..."
    let y = tokenize(x).next().value
    expect(y).toEqual('ELLIPSIS')
})

// | NULL     -> "NULL"
test('NULL test', () => {
    let x = "null"
    let y = tokenize(x).next().value
    expect(y).toEqual("NULL")
})

// | TYPE       _ -> "TYPE"
test('TYPE test', () => {
    let x = "function"
    let y = tokenize(x).next().value
    let token = { TYPE: "function" }
    expect(y).toEqual(token)
})

// | ID _ -> "ID"
test('ID test', () => {
    let x = "x"
    let y = tokenize(x).next().value
    let token = { ID: "x" }
    expect(y).toEqual(token)

})

// | BOOLEAN    _ -> "BOOLEAN"
test('BOOLEAN test', () => {
    let x = "true"
    let y = tokenize(x).next().value
    expect(y).toEqual({ BOOLEAN: true })
})

// | NUMBER     _ -> "NUMBER"
test('NUMBER test', () => {
    let x = "123"
    let y = tokenize(x).next().value
    expect(y).toEqual({ NUMBER: 123 })
})

// | QUOTE      _ -> "QUOTE"
test('QUOTE test', () => {
    let x = '"abc"'
    let y = tokenize(x).next().value
    expect(y).toEqual({ QUOTE: "abc" })
})

test('tokenize many tokens test', () => {
    let x = '[...]'
    let y = [...tokenize(x)]
    expect(y).toEqual(['LBRACK', 'ELLIPSIS', 'RBRACK'])
})

