import { tokenize } from '../tokens'
import { typevalidparse } from './typevalidparse'
import { translate } from './translation'

const parse = (input) => translate(typevalidparse(tokenize(input)))

test("value NULL", () => {
    let input = "null"
    let y = parse(input)
    let e = { leftside: 'value', children: [{ token: 'NULL' }] }
    let u = { primitive: null }
    expect(y).toEqual(u)
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
    let u = { either: [{ primitive: true }, { primitive: false }] }
    expect(y).toEqual(u)
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

    // expect(y).toEqual(e)
    let u = { primitive: 123 }
    expect(y).toEqual(u)
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
    let u = { primitive: '' }
    expect(y).toEqual(u)
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
    let u = { type: 'number' }
    expect(y).toEqual(u)
})

test("value ID", () => {
    let input = 'x'
    let y = parse(input)
    // console.log(y)
    let e = {
        leftside: 'value',
        children: [{ token: { ID: 'x' } }]
    }
    let u = { wild: 'x' }
    expect(y).toEqual(u)
})

test("value array", () => {
    let input = '[]'
    let y = parse(input)
    // console.log(y.children[0].children)
    let e = {
        leftside: 'value',
        children: [{ leftside: 'array', children: [{ token: 'LBRACK' }, { token: 'RBRACK' }] }]
    }
    let u = { fixedArray: [] }
    expect(y).toEqual(u)
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
    let u = { variadicArray: [[], []] }
    expect(y).toEqual(u)
})

test("value object", () => {
    let input = '{}'
    let y = parse(input)
    // console.log(y.children[0].children)
    let e = {
        leftside: 'value',
        children: [{ leftside: 'object', children: [{ token: 'LBRACE' }, { token: 'RBRACE' }] }]
    }
    let u = { exactObject: [] }
    expect(y).toEqual(u)
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
    let u = { compatObject: [] }
    expect(y).toEqual(u)
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
    let u = { fixedArray: [{ primitive: 1 }] }
    expect(y).toEqual(u)
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
    let u = { variadicArray: [[{ primitive: null }], []] }
    expect(y).toEqual(u)
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
    let u = { variadicArray: [[], [{ primitive: null }]] }
    expect(y).toEqual(u)
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
    let u = { variadicArray: [[{ primitive: 1 }], [{ primitive: 2 }]] }
    expect(y).toEqual(u)
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
    let u = { fixedArray: [{ primitive: 1 }, { primitive: 2 }] }
    expect(y).toEqual(u)
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
    let u = { exactObject: [{ prop: { key: 'x', value: { wild: 'x' } } }] }
    expect(y).toEqual(u)
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
    let u = { compatObject: [{ prop: { key: 'x', value: { wild: 'x' } } }] }
    expect(y).toEqual(u)
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
    let u = { exactObject: [{ prop: { key: 'x', value: { wild: 'x' } } }, { prop: { key: 'y', value: { wild: 'y' } } }] }
    expect(y).toEqual(u)
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
    let u = { exactObject: [{ prop: { key: 'x', value: { primitive: null } } }] }
    expect(y).toEqual(u)
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
    let u = { exactObject: [{ prop: { key: '1', value: { primitive: null } } }] }
    expect(y).toEqual(u)
})





