import { tokenize } from './tokens'
import { typevalidparse, translate } from './parser'

export const like = (input) => translate(typevalidparse(tokenize(input)))
