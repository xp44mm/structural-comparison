export function advance(n, array) {
    let taken = []
    for (let i = 0; i < n; i++) {
        taken[n - 1 - i] = array[i]
    }
    return [taken, array.slice(n)]
}
