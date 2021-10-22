export const tryToken = (rgx, type) => {
    function fn(input) {
        let res = rgx.exec(input)
        if (res && res.length > 0) {
            let lexeme = res[0]
            let restInput = input.slice(lexeme.length)
            return { token: { [type]: lexeme }, restInput }
        } else {
            return null
        }
    }
    return fn
}