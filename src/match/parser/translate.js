import { token, prod, rightside, isProd } from '../../compiler'
import { cond } from '../../ramda/cond'

export const translate = cond([
    [isProd('value'), parseTree => trans_value(parseTree.children)],
    parseTree => {
        console.log(parseTree)
        throw new Error('translate')
    }
])

const trans_value = cond([
    [rightside(token('NULL')), ss => {
        return obj => obj === null
    }],
    [rightside(token('BOOLEAN')), ss => {
        let s0 = ss[0].token.BOOLEAN
        return obj => obj === s0
    }],
    [rightside(token('NUMBER')), ss => {
        let s0 = ss[0].token.NUMBER
        return obj => obj === s0
    }],
    [rightside(token('QUOTE')), ss => {
        let s0 = ss[0].token.QUOTE
        return obj => obj === s0
    }],
    [rightside(token('TYPE')), ss => {
        let s0 = ss[0].token.TYPE
        return obj => typeof obj === s0
    }],
    [rightside(token('ID')), ss => {
        let s0 = ss[0].token.ID
        return obj => true
    }],
    [rightside(prod('array')), ss => {
        let s0 = trans_array(ss[0].children)
        return obj => Array.isArray(obj) && s0(obj)
    }],
    [rightside(prod('object')), ss => {
        let s0 = trans_object(ss[0].children)
        return obj => typeof obj === 'object' && obj && !Array.isArray(obj) && s0(obj)
    }],
    [rightside(prod('value'), token('BAR'), prod('value')), ss => {
        let s0 = trans_value(ss[0].children)
        let s2 = trans_value(ss[2].children)
        return obj => s0(obj) || s2(obj)
    }],
    ss => { throw new Error('trans_value') }
])

const trans_array = cond([
    [rightside(token('LBRACK'), token('RBRACK')), ss => {
        return obj => obj.length === 0
    }],
    [rightside(token('LBRACK'), prod('elements'), token('RBRACK')), ss => {
        let s1 = trans_elements(ss[1].children)
        return obj => {
            if (obj.length === s1.length) {
                return s1.every((f, i) => f(obj[i]))
            }
            return false
        }
    }],
    [rightside(token('LBRACK'), token('ELLIPSIS'), token('RBRACK')), ss => {
        return obj => true
    }],
    [rightside(token('LBRACK'), prod('elements'), token('COMMA'), token('ELLIPSIS'), token('RBRACK')), ss => {
        let s1 = trans_elements(ss[1].children)
        return obj => {
            if (obj.length < s1.length) return false
            return s1.every((f, i) => f(obj[i]))
        }
    }],
    [rightside(token('LBRACK'), token('ELLIPSIS'), token('COMMA'), prod('elements'), token('RBRACK')), ss => {
        let s3 = trans_elements(ss[3].children)
        return obj => {
            let n = obj.length - s3.length
            if (n < 0) return false
            return s3.every((f, i) => f(obj[n + i]))
        }
    }],
    [rightside(token('LBRACK'), prod('elements'), token('COMMA'), token('ELLIPSIS'), token('COMMA'), prod('elements'), token('RBRACK')), ss => {
        let s1 = trans_elements(ss[1].children)
        let s5 = trans_elements(ss[5].children)
        return obj => {
            let n = obj.length - s5.length
            if (n < s1.length) return false
            return s1.every((f, i) => f(obj[i])) && s5.every((f, i) => f(obj[n + i]))
        }
    }],
    ss => { throw new Error('trans_array') }
])

const trans_object = cond([
    [rightside(token('LBRACE'), token('RBRACE')), ss => {
        return obj => Object.keys(obj).length === 0
    }],
    [rightside(token('LBRACE'), prod('properties'), token('RBRACE')), ss => {
        let s1 = trans_properties(ss[1].children)
        let mp = new Map(s1)
        return obj => {
            let entries = Object.entries(obj)
            if (entries.length === mp.size) {
                return entries.every(([k, v]) => mp.has(k) && mp.get(k)(v))
            }
            return false
        }
    }],
    [rightside(token('LBRACE'), token('ELLIPSIS'), token('RBRACE')), ss => {
        return obj => true
    }],
    [rightside(token('LBRACE'), prod('properties'), token('COMMA'), token('ELLIPSIS'), token('RBRACE')), ss => {
        let s1 = trans_properties(ss[1].children)
        let mp = new Map(s1)
        return obj => {
            let entries = Object.entries(obj)
            if (entries.length < mp.size) return false
            for (const [key, value] of mp) {
                if (obj.hasOwnProperty(key) && value(obj[key])) continue
                return false
            }
            return true
        }

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
        return [s0, (obj) => true]
    }],
    [rightside(prod('key'), token('COLON'), prod('value')), ss => {
        let s0 = trans_key(ss[0].children)
        let s2 = trans_value(ss[2].children)
        return [s0, s2]
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

