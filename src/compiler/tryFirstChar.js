export const tryFirstChar = (firstChar, token) => input => {
    if (input === '') {
        return null
    } else if (input.charAt(0) === firstChar) {
        let restInput = input.slice(1)
        return { token, restInput }
    } else {
        return null
    }
}
