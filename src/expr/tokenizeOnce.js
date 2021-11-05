import { cond } from "../ramda/cond"
import { tryFirstChar, tryWhitespace, tryToken } from '../compiler'
import { pipeline } from './../allonge/pipeline';

export const tokenizeOnce = cond([
    tryWhitespace,
    tryFirstChar(')', ')'),
    tryFirstChar('(', '('),
    tryFirstChar('*', '*'),
    tryFirstChar('+', '+'),
    pipeline(tryToken(/^\d+/, 'DIGIT'), ({ token: { DIGIT }, restInput }) => ({ token: { DIGIT: parseInt(DIGIT) }, restInput })),
])
