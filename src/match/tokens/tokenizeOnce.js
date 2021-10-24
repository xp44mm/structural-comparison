import { tryFirstChar, tryWhitespace, tryNumber, tryQuote } from '../../compiler'
import { cond } from "../../ramda/cond"
import { tryEllipsis } from './tryEllipsis'
import { tryIdentifier } from './tryIdentifier'

export const tokenizeOnce = cond([
    tryWhitespace,
    tryFirstChar('{', 'LBRACE'),
    tryFirstChar('}', 'RBRACE'),
    tryFirstChar('[', 'LBRACK'),
    tryFirstChar(']', 'RBRACK'),
    tryFirstChar('|', 'BAR'),
    tryFirstChar(',', 'COMMA'),
    tryFirstChar(':', 'COLON'),
    tryEllipsis,
    tryQuote,
    tryNumber,
    tryIdentifier,
])
