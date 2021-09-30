import { tryToken } from './tryToken'

const preIdent = tryToken(/^[_\p{L}\p{Nl}][\p{L}\p{Mn}\p{Mc}\p{Nl}\p{Nd}\p{Pc}\p{Cf}]*/u, 'IDENTIFIER')

export const tryIdentifier = (input = "") => {
    let maybeIdent = preIdent(input)

    if (maybeIdent) {
        let { token: { IDENTIFIER }, restInput } = maybeIdent
        if (IDENTIFIER === 'null') {
            return { token: 'NULL', restInput }
        } else if (IDENTIFIER === 'true' || IDENTIFIER === 'false') {
            let BOOLEAN = IDENTIFIER === 'true'
            return { token: { BOOLEAN }, restInput }
        } else if (IDENTIFIER === 'boolean' || IDENTIFIER === 'string' || IDENTIFIER === 'number' || IDENTIFIER === 'function') {
            let TYPE = IDENTIFIER
            return { token: { TYPE }, restInput }
        } else {
            return maybeIdent
        }
    } else {
        return null
    }
}
