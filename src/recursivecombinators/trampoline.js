/**
 * A trampoline is a loop that iteratively invokes thunk-returning functions (continuation-passing style).
 * 
 * @param {function} fn that is a function with no arguments
 * @returns {any}
 * @see R.thunkify
 */

export const trampoline = fn => (...args) => {
    let value = fn(...args)
    while (value && typeof value === 'function') {
        value = value()
    }
    return value
}


class Thunk {
    constructor(delayed) {
        this.delayed = delayed;
    }

    evaluate() {
        return this.delayed();
    }
}

const trampoline =
    fn =>
        (...initialArgs) => {
            let value = fn(...initialArgs);

            while (value instanceof Thunk) {
                value = value.evaluate();
            }

            return value;
        };

const isEven =
    trampoline(
        function myself(n, parity = 0) {
            if (n === 0) {
                return parity === 0;
            } else {
                return new Thunk(() => myself(n - 1, 1 - parity));
            }
        }
    );

isEven(1000001)
    //=> false