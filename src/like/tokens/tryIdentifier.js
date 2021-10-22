import { tryToken } from '../../compiler'

const preIdent = tryToken(/^[_\p{L}\p{Nl}][\p{L}\p{Mn}\p{Mc}\p{Nl}\p{Nd}\p{Pc}\p{Cf}]*/u, 'ID')

export const tryIdentifier = (input = "") => {
    let maybeIdent = preIdent(input)

    if (maybeIdent) {
        let { token: { ID }, restInput } = maybeIdent
        if (ID === 'null') {
            return { token: 'NULL', restInput }
        } else if (ID === 'true' || ID === 'false') {
            let BOOLEAN = ID === 'true'
            return { token: { BOOLEAN }, restInput }
        } else if (ID === 'boolean' || ID === 'string' || ID === 'number' || ID === 'function') {
            let TYPE = ID
            return { token: { TYPE }, restInput }
        } else {
            return maybeIdent
        }
    } else {
        return null
    }
}
