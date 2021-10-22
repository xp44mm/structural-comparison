export const token = (token) => (/*console.log(token), */{ token })
export const prod = (leftside) => (/*console.log(leftside), */{ leftside })

export const isProd = (leftside) => obj =>
    obj && typeof obj === 'object' &&
    obj.leftside === leftside &&
    Array.isArray(obj.children)

export const rightside = (...patterns) => children => {
    if (children.length === patterns.length) {
        return patterns.every((pattern, i) => testSymbol(pattern)(children[i]))
    }
}

const isToken = (tag) => obj => {
    if (obj && typeof obj === 'object' && obj.token) {
        if (typeof obj.token === 'string') {
            return obj.token === tag
        } else {
            return Object.keys(obj.token)[0] === tag
        }
    }
}

const testSymbol = (pattern) => {
    if ('token' in pattern) {
        return isToken(pattern.token)
    }
    if ('leftside' in pattern) {
        return isProd(pattern.leftside)
    }
}


