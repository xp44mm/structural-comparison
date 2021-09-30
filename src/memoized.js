export const memoized = (fn) => {
    const lookupTable = new Map()
    return (arg) => {
        if (!lookupTable.has(arg)) {
            lookupTable.set(arg, fn(arg))
        }
        return lookupTable[arg]
    }
}