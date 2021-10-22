import json from './typevalidParseTable.json'
import { ParserConfig } from '../../compiler'

const getTag = token => {
    if (token === 'BAR') return "|"
    if (token === 'COMMA') return ","
    if (token === 'COLON') return ":"
    if (token === 'LBRACK') return "["
    if (token === 'RBRACK') return "]"
    if (token === 'LBRACE') return "{"
    if (token === 'RBRACE') return "}"
    if (token === 'ELLIPSIS') return "..."
    if (token === 'NULL') return "NULL"
    return Object.keys(token)[0]
}

let config = new ParserConfig(json)
config.setGetTag(getTag)

export const typevalidparse = config.parse.bind(config)