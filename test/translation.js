import { token, prod, rightside, isProd } from '../src/compiler/parseTree'
import { cond } from '../src/ramda/cond'

export const translate = cond([
    [isProd('value'), parseTree => trans_value(parseTree.children)],
    parseTree => {
        console.log(parseTree)
        throw new Error('translate')
    }
])

const trans_value = cond([
    [rightside(token('NULL')), ss => {
        return { primitive: null }
    }],
    [rightside(token('BOOLEAN')), ss => {
        let s0 = ss[0].token.BOOLEAN
        return { primitive: s0 }
    }],
    [rightside(token('NUMBER')), ss => {
        let s0 = ss[0].token.NUMBER
        return { primitive: s0 }
    }],
    [rightside(token('QUOTE')), ss => {
        let s0 = ss[0].token.QUOTE
        return { primitive: s0 }
    }],
    [rightside(token('TYPE')), ss => {
        let s0 = ss[0].token.TYPE
        return { type: s0 }
    }],
    [rightside(token('ID')), ss => {
        let s0 = ss[0].token.ID
        return { wild: s0 }
    }],
    [rightside(prod('array')), ss => {
        let s0 = trans_array(ss[0].children)
        return s0
    }],
    [rightside(prod('object')), ss => {
        let s0 = trans_object(ss[0].children)
        return s0
    }],
    [rightside(prod('value'), token('BAR'), prod('value')), ss => {
        let s0 = trans_value(ss[0].children)
        let s2 = trans_value(ss[2].children)
        return { either: [s0, s2] }
    }],
    ss => { throw new Error('trans_value') }
])

const trans_array = cond([
    [rightside(token('LBRACK'), token('RBRACK')), ss => {
        return { fixedArray: [] }
    }],
    [rightside(token('LBRACK'), prod('elements'), token('RBRACK')), ss => {
        let s1 = trans_elements(ss[1].children)
        return { fixedArray: s1 }
    }],
    [rightside(token('LBRACK'), token('ELLIPSIS'), token('RBRACK')), ss => {
        return { variadicArray: [[], []] }
    }],
    [rightside(token('LBRACK'), prod('elements'), token('COMMA'), token('ELLIPSIS'), token('RBRACK')), ss => {
        let s1 = trans_elements(ss[1].children)
        return { variadicArray: [s1, []] }
    }],
    [rightside(token('LBRACK'), token('ELLIPSIS'), token('COMMA'), prod('elements'), token('RBRACK')), ss => {
        let s3 = trans_elements(ss[3].children)
        return { variadicArray: [[], s3] }
    }],
    [rightside(token('LBRACK'), prod('elements'), token('COMMA'), token('ELLIPSIS'), token('COMMA'), prod('elements'), token('RBRACK')), ss => {
        let s1 = trans_elements(ss[1].children)
        let s5 = trans_elements(ss[5].children)
        return { variadicArray: [s1, s5] }
    }],
    ss => { throw new Error('trans_array') }
])

const trans_object = cond([
    [rightside(token('LBRACE'), token('RBRACE')), ss => {
        return { exactObject: [] }
    }],
    [rightside(token('LBRACE'), prod('properties'), token('RBRACE')), ss => {
        let s1 = trans_properties(ss[1].children)
        return { exactObject: s1 }
    }],
    [rightside(token('LBRACE'), token('ELLIPSIS'), token('RBRACE')), ss => {
        return { compatObject: [] }
    }],
    [rightside(token('LBRACE'), prod('properties'), token('COMMA'), token('ELLIPSIS'), token('RBRACE')), ss => {
        let s1 = trans_properties(ss[1].children)
        return { compatObject: s1 }
    }],
    ss => { throw new Error('trans_object') }
])

const trans_elements = cond([
    [rightside(prod('value')), ss => {
        let s0 = trans_value(ss[0].children)
        return [s0]
    }],
    [rightside(prod('elements'), token('COMMA'), prod('value')), ss => {
        let s0 = trans_elements(ss[0].children)
        let s2 = trans_value(ss[2].children)
        s0[s0.length] = s2
        return s0
    }],
    ss => { throw new Error('trans_elements') }

])

const trans_properties = cond([
    [rightside(prod('prop')), ss => {
        let s0 = trans_prop(ss[0].children)
        return [s0]
    }],
    [rightside(prod('properties'), token('COMMA'), prod('prop')), ss => {
        let s0 = trans_properties(ss[0].children)
        let s2 = trans_prop(ss[2].children)
        s0[s0.length] = s2
        return s0
    }],
    ss => { throw new Error('trans_properties') }
])

const trans_prop = cond([
    [rightside(prod('key')), ss => {
        let s0 = trans_key(ss[0].children)
        return { prop: { key: s0, value: { wild: s0 } } }
    }],
    [rightside(prod('key'), token('COLON'), prod('value')), ss => {
        let s0 = trans_key(ss[0].children)
        let s2 = trans_value(ss[2].children)
        return { prop: { key: s0, value: s2 } }
    }],
    ss => { throw new Error('trans_prop') }
])

const trans_key = cond([
    [rightside(token('ID')), ss => {
        let s0 = ss[0].token.ID
        return s0
    }],
    [rightside(token('QUOTE')), ss => {
        let s0 = ss[0].token.QUOTE
        return s0
    }],
    ss => { throw new Error('trans_key') }
])

