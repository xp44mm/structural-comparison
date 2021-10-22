export const tryEllipsis = (inp) => {
    if (inp.startsWith('...')) {
        return { token: 'ELLIPSIS', restInput: inp.slice(3) }
    } else {
        return null
    }
}


