import { translate } from './translate'

test("value NULL", () => {
    let input = "null"
    let tree =  { leftside: 'value', children: [{ token: 'NULL' }] }
    let u = { primitive: null }
    let y = translate(tree)
    let v = y(null)
    let w = y(3)
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("value boolean", () => {
    let input = "true|false"
    // console.log(y)
    let tree =  {
        leftside: 'value',
        children: [
            { leftside: 'value', children: [{ token: { BOOLEAN: true } }] },
            { token: 'BAR' },
            { leftside: 'value', children: [{ token: { BOOLEAN: false } }] }
        ]
    }
    let u = { either: [{ primitive: true }, { primitive: false }] }
    let y = translate(tree)

    let v = y(false)
    let w = y(3)
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("value number", () => {
    let input = "123"
    let tree =  {
        leftside: 'value',
        children: [
            { token: { NUMBER: 123 } }]
    }

    // expect(y).toEqual(e)
    let u = { primitive: 123 }
    let y = translate(tree)

    let v = y(123)
    let w = y(3)
    expect(v).toEqual(true)
    expect(w).toEqual(false)

})

test("value quote", () => {
    let input = '""'
    let tree =  {
        leftside: 'value',
        children: [
            { token: { QUOTE: '' } }]
    }
    let u = { primitive: '' }
    let y = translate(tree)

    let v = y('')
    let w = y(3)
    expect(v).toEqual(true)
    expect(w).toEqual(false)

})

test("value TYPE", () => {
    let input = 'number'
    let tree =  {
        leftside: 'value',
        children: [
            { token: { TYPE: 'number' } }]
    }
    let u = { type: 'number' }
    let y = translate(tree)

    let v = y(5)
    let w = y(true)
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("value ID", () => {
    let input = 'x'
    let tree =  {
        leftside: 'value',
        children: [{ token: { ID: 'x' } }]
    }
    let u = { wild: 'x' }
    let y = translate(tree)

    let v = y(5)
    let w = y({})
    expect(v).toEqual(true)
    expect(w).toEqual(true)
})

test("value array", () => {
    let input = '[]'
    let tree =  {
        leftside: 'value',
        children: [{ leftside: 'array', children: [{ token: 'LBRACK' }, { token: 'RBRACK' }] }]
    }
    let u = { fixedArray: [] }
    let y = translate(tree)

    let v = y([])
    let w = y({})
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("array ELLIPSIS", () => {
    let input = '[...]'
    let tree =  {
        leftside: 'value',
        children: [{
            leftside: 'array', children: [{ token: 'LBRACK' }, { token: 'ELLIPSIS' }, { token: 'RBRACK' }]
        }]
    }
    let u = { variadicArray: [[], []] }
    let y = translate(tree)

    let v = y([1])
    let w = y({})
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("value object", () => {
    let input = '{}'
    let tree =  {
        leftside: 'value',
        children: [{ leftside: 'object', children: [{ token: 'LBRACE' }, { token: 'RBRACE' }] }]
    }
    let u = { exactObject: [] }
    let y = translate(tree)

    let v = y({})
    let w = y({ x: 0 })
    expect(v).toEqual(true)
    expect(w).toEqual(false)

})

test("object ELLIPSIS", () => {
    let input = '{...}'
    let tree =  {
        leftside: 'value',
        children: [{
            leftside: 'object', children: [{ token: 'LBRACE' }, { token: 'ELLIPSIS' }, { token: 'RBRACE' }]
        }]
    }
    let u = { compatObject: [] }
    let y = translate(tree)

    let v = y({})
    let w = y({ x: 0 })
    let p = y([])

    expect(v).toEqual(true)
    expect(w).toEqual(true)
    expect(p).toEqual(false)

})

test("array elements", () => {
    let input = '[1]'
    let tree =  {
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
    let y = translate(tree)

    let v = y([1])
    let w = y([{ x: 0 }])
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("array elements ELLIPSIS", () => {
    let input = '[null, ...]'
    let tree =  {
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
    let y = translate(tree)

    let v = y([null])
    let w = y([null, 0])
    let p = y([0])

    expect(v).toEqual(true)
    expect(w).toEqual(true)
    expect(p).toEqual(false)
})

test("array ELLIPSIS elements", () => {
    let input = '[ ..., null]'
    let tree =  {
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
    let y = translate(tree)

    let v = y([null])
    let w = y([0, null])
    let p = y([null, 0])

    expect(v).toEqual(true)
    expect(w).toEqual(true)
    expect(p).toEqual(false)
})

test("array elements ELLIPSIS elements", () => {
    let input = '[1, ..., 2]'
    let tree =  {
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
    let y = translate(tree)

    let v = y([1, 2])
    let w = y([1, 1.5, 2])
    let p = y([1, 1])
    expect(v).toEqual(true)
    expect(w).toEqual(true)
    expect(p).toEqual(false)
})

test("elements elements value", () => {
    let input = '[1, 2]'
    let tree =  {
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
    let y = translate(tree)

    let v = y([1, 2])
    let w = y([null, 1])
    expect(v).toEqual(true)
    expect(w).toEqual(false)

})

test("object properties", () => {
    let input = '{x}'
    let tree =  {
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
    let y = translate(tree)

    let v = y({ x: 0 })
    let w = y([null, 1])
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("object properties ELLIPSIS", () => {
    let input = '{x,...}'
    let tree =  {
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
    let y = translate(tree)

    let v = y({ x: 0, y: 1 })
    let w = y({})
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})
test("properties properties prop", () => {
    let input = '{x,y}'
    let tree =  {
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
    let y = translate(tree)

    let v = y({ x: 0, y: 1 })
    let w = y({})
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("prop key value", () => {
    let input = '{x:null}'
    let tree =  {
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
    let y = translate(tree)

    let v = y({ x: null })
    let w = y([null, 1])
    expect(v).toEqual(true)
    expect(w).toEqual(false)

})

test("key QUOTE", () => {
    let input = '{"1":null}'
    let tree =  {
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
    let y = translate(tree)

    let v = y({ '1': null })
    let w = y([null, 1])
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})





