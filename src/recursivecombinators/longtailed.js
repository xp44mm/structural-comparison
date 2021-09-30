
/**
 * the decoupled trampoline. it works with functions that must be tail-recursive.
 * @param {function} fn 
 * @returns {function}
 * 
 */
export const longtailed =
    fn => {
        class Thunk {
            constructor(fn, ...args) {
                this.fn = fn;
                this.args = args;
            }

            evaluate() {
                return this.fn(...this.args);
            }
        }

        const thunkify =
            fn =>
                (...args) =>
                    new Thunk(fn, ...args);

        return (...initialArgs) => {
            let value =
                (x => x(x))(
                    maker =>
                        (...args) =>
                            fn(thunkify(maker(maker)), ...args)
                )(...initialArgs);

            while (value instanceof Thunk) {
                value = value.evaluate();
            }

            return value;
        };
    };