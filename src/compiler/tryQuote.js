import { tryToken } from './tryToken'

export const preQuote = tryToken(/^"(\\u[0-9A-Fa-f]{4}|\\[\\"bfnrt]|[^\\"\r\n])*"/, 'QUOTE')

export const tryQuote = (input) => {
    let maybeQuote = preQuote(input)
    if (maybeQuote) {
        let { token: { QUOTE: str }, restInput } = maybeQuote
        let QUOTE = JSON.parse(str)
        return { token: { QUOTE }, restInput }
    } else {
        return null
    }
}


