export const thunk = (fn) => function createThunk(...args) {
    return function invokeThunk() {
        return fn.apply(this, args)
    }
}