import { tryFirstChar, tryWhitespace } from '../../compiler'
import { cond } from "../../ramda/cond"
import { tryEllipsis } from './tryEllipsis'
import { tryIdentifier } from './tryIdentifier'
import { tryNumber } from './tryNumber'
import { tryQuote } from './tryQuote'

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
    //trySymbol,
])

