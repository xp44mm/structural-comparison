import { tryToken } from '../../compiler'

let prenum = tryToken(/^[-+]?\d+(\.\d+)?([eE][-+]?\d+)?/, 'NUMBER')

export const tryNumber = (input) => {
    let maybeNum = prenum(input)
    if (maybeNum) {
        let { token: { NUMBER: nstr }, restInput } = maybeNum
        let NUMBER = Number.parseFloat(nstr)
        return { token: { NUMBER }, restInput }
    } else {
        return null
    }
}


