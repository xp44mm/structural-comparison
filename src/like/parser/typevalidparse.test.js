import { tokenize } from '../tokens'
import { typevalidparse } from './typevalidparse'

const parse = (input) => typevalidparse(tokenize(input))

test("value NULL", () => {
    let input = "null"
    let y = parse(input)
    let e = { leftside: 'value', children: [{ token: 'NULL' }] }
    expect(y).toEqual(e)
})

test("value boolean", () => {
    let input = "true|false"
    let y = parse(input)
    // console.log(y)
    let e = {
        leftside: 'value',
        children: [
            { leftside: 'value', children: [{ token: { BOOLEAN: true } }] },
            { token: 'BAR' },
            { leftside: 'value', children: [{ token: { BOOLEAN: false } }] }
        ]
    }
    expect(y).toEqual(e)
})

test("value number", () => {
    let input = "123"
    let y = parse(input)
    // console.log(y)
    let e = {
        leftside: 'value',
        children: [
            { token: { NUMBER: 123 } }]
    }
    expect(y).toEqual(e)
})

test("value quote", () => {
    let input = '""'
    let y = parse(input)
    // console.log(y)
    let e = {
        leftside: 'value',
        children: [
            { token: { QUOTE: '' } }]
    }
    expect(y).toEqual(e)
})

test("value TYPE", () => {
    let input = 'number'
    let y = parse(input)
    // console.log(y)
    let e = {
        leftside: 'value',
        children: [
            { token: { TYPE: 'number' } }]
    }
    expect(y).toEqual(e)
})

test("value ID", () => {
    let input = 'x'
    let y = parse(input)
    // console.log(y)
    let e = {
        leftside: 'value',
        children: [{ token: { ID: 'x' } }]
    }
    expect(y).toEqual(e)
})

test("value array", () => {
    let input = '[]'
    let y = parse(input)
    // console.log(y.children[0].children)
    let e = {
        leftside: 'value',
        children: [{ leftside: 'array', children: [{ token: 'LBRACK' }, { token: 'RBRACK' }] }]
    }
    expect(y).toEqual(e)
})

test("value object", () => {
    let input = '{}'
    let y = parse(input)
    // console.log(y.children[0].children)
    let e = {
        leftside: 'value',
        children: [{ leftside: 'object', children: [{ token: 'LBRACE' }, { token: 'RBRACE' }] }]
    }
    expect(y).toEqual(e)
})

test("array elements", () => {
    let input = '[1]'
    let y = parse(input)
    // console.log(y.children[0].children)
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'array', children: [{ token: 'LBRACK' }, {
                leftside: 'elements', children: [
                    {
                        leftside: 'value',
                        children: [
                            { token: { NUMBER: 1 } }]
                    }
                ]
            }, { token: 'RBRACK' }]
        }]
    }
    expect(y).toEqual(e)
})

test("array ELLIPSIS", () => {
    let input = '[...]'
    let y = parse(input)
    // console.log(y.children[0].children)
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'array', children: [{ token: 'LBRACK' }, { token: 'ELLIPSIS' }, { token: 'RBRACK' }]
        }]
    }
    expect(y).toEqual(e)
})

test("array elements ELLIPSIS", () => {
    let input = '[null, ...]'
    let y = parse(input)
    // console.log(y.children[0].children)
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'array', children: [{ token: 'LBRACK' }, {
                leftside: 'elements', children: [
                    {
                        leftside: 'value',
                        children: [
                            { token: 'NULL' }]
                    }
                ]
            }, { token: 'COMMA' }, { token: 'ELLIPSIS' }, { token: 'RBRACK' }]
        }]
    }
    expect(y).toEqual(e)
})

test("array ELLIPSIS elements", () => {
    let input = '[ ..., null]'
    let y = parse(input)
    // console.log(y.children[0].children)
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'array', children: [{ token: 'LBRACK' }, { token: 'ELLIPSIS' }, { token: 'COMMA' }, {
                leftside: 'elements', children: [
                    {
                        leftside: 'value',
                        children: [
                            { token: 'NULL' }]
                    }
                ]
            }, { token: 'RBRACK' }]
        }]
    }
    expect(y).toEqual(e)
})

test("array elements ELLIPSIS elements", () => {
    let input = '[1, ..., 2]'
    let y = parse(input)
    // console.log(y.children[0].children)
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'array', children: [{ token: 'LBRACK' }, {
                leftside: 'elements', children: [
                    {
                        leftside: 'value',
                        children: [
                            { token: { NUMBER: 1 } }]
                    }
                ]
            }, { token: 'COMMA' }, { token: 'ELLIPSIS' }, { token: 'COMMA' }, {
                leftside: 'elements', children: [
                    {
                        leftside: 'value',
                        children: [
                            { token: { NUMBER: 2 } }]
                    }
                ]
            }, { token: 'RBRACK' }]
        }]
    }
    expect(y).toEqual(e)
})

test("object properties", () => {
    let input = '{x}'
    let y = parse(input)
    // console.log(y.children[0].children[1].children[0].children[0])
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'object', children: [{ token: 'LBRACE' }, {
                leftside: 'properties',
                children: [{
                    leftside: 'prop',
                    children: [{ leftside: 'key', children: [{ token: { ID: 'x' } }] }]
                }]
            }, { token: 'RBRACE' }]
        }]
    }
    expect(y).toEqual(e)
})

test("object ELLIPSIS", () => {
    let input = '{...}'
    let y = parse(input)
    // console.log(y.children[0].children[1].children[0].children[0])
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'object', children: [{ token: 'LBRACE' }, { token: 'ELLIPSIS' }, { token: 'RBRACE' }]
        }]
    }
    expect(y).toEqual(e)
})

test("object properties ELLIPSIS", () => {
    let input = '{x,...}'
    let y = parse(input)
    // console.log(y.children[0].children[1].children[0].children[0])
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'object', children: [{ token: 'LBRACE' }, {
                leftside: 'properties',
                children: [{
                    leftside: 'prop',
                    children: [{ leftside: 'key', children: [{ token: { ID: 'x' } }] }]
                }]
            }, { token: 'COMMA' }, { token: 'ELLIPSIS' }, { token: 'RBRACE' }]
        }]
    }
    expect(y).toEqual(e)
})

test("elements elements value", () => {
    let input = '[1, 2]'
    let y = parse(input)
    // console.log(y.children[0].children[1].children[0])
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'array', children: [{ token: 'LBRACK' }, {
                leftside: 'elements', children: [
                    {
                        leftside: 'elements', children: [{
                            leftside: 'value',
                            children: [
                                { token: { NUMBER: 1 } }]
                        }]
                    }, { token: 'COMMA' }, {
                        leftside: 'value',
                        children: [
                            { token: { NUMBER: 2 } }]
                    }

                ]
            }, { token: 'RBRACK' }]
        }]
    }
    expect(y).toEqual(e)
})

test("properties properties prop", () => {
    let input = '{x,y}'
    let y = parse(input)
    // console.log(y.children[0].children[1])
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'object', children: [{ token: 'LBRACE' },
            {
                leftside: 'properties',
                children: [{
                    leftside: 'properties',
                    children: [{
                        leftside: 'prop',
                        children: [{ leftside: 'key', children: [{ token: { ID: 'x' } }] }]
                    }]
                }, { token: 'COMMA' }, {
                    leftside: 'prop',
                    children: [{ leftside: 'key', children: [{ token: { ID: 'y' } }] }]
                }]
            }, { token: 'RBRACE' }]
        }]
    }
    expect(y).toEqual(e)
})

test("prop key value", () => {
    let input = '{x:null}'
    let y = parse(input)
    // console.log(y.children[0].children[1].children[0].children[0])
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'object', children: [{ token: 'LBRACE' }, {
                leftside: 'properties',
                children: [{
                    leftside: 'prop',
                    children: [
                        { leftside: 'key', children: [{ token: { ID: 'x' } }] },
                        { token: 'COLON' },
                        { leftside: 'value', children: [{ token: 'NULL' }] }]
                }]
            }, { token: 'RBRACE' }]
        }]
    }
    expect(y).toEqual(e)
})

test("key QUOTE", () => {
    let input = '{"1":null}'
    let y = parse(input)
    // console.log(y.children[0].children[1].children[0].children[0])
    let e = {
        leftside: 'value',
        children: [{
            leftside: 'object', children: [{ token: 'LBRACE' }, {
                leftside: 'properties',
                children: [{
                    leftside: 'prop',
                    children: [
                        { leftside: 'key', children: [{ token: { QUOTE: '1' } }] },
                        { token: 'COLON' },
                        { leftside: 'value', children: [{ token: 'NULL' }] }]
                }]
            }, { token: 'RBRACE' }]
        }]
    }
    expect(y).toEqual(e)
})



