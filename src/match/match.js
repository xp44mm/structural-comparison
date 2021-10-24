import { tokenize } from './tokens'
import { typevalidparse, translate } from './parser'

let compile = (input) => {
    try {
        return typevalidparse(tokenize(input))
    } catch (e) {
        throw new Error("parse error in " + input)
    }
}

export const match = (input) => translate(compile(input))
