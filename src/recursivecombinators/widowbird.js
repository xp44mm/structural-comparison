/**
 * If we can create a similar function that has the same contract as the why bird, 
 * but uses a trampoline to evaluate the recursive function, 
 * we could execute tail-recursive functions in constant stack space.
 * We will call this function the “Long-tailed Widowbird.”
 * @param {function} fn 
 * @returns {function}
 */
export const widowbird =
    fn => {
        class Thunk {
            constructor(args) {
                this.args = args;
            }

            evaluate() {
                return fn(...this.args);
            }
        }

        return (...initialArgs) => {
            let value = fn(
                (...args) => new Thunk(args),
                ...initialArgs
            );

            while (value instanceof Thunk) {
                value = value.evaluate();
            }

            return value;
        };
    };
