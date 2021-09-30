import { tokenizeOnce } from "./tokenizeOnce"

export function* tokenize(input) {
    if (input === "") {
        return
    } else {
        let { token, restInput } = tokenizeOnce(input)
        if (token) {
            if (!token.WHITESPACE) {
                yield token
            }
            yield* tokenize(restInput)
        } else {
            throw new Error(input)
        }
    }
}

