
/**
 * leftVariadic function is a decorator that turns any function into a function that gathers parameters from the left, instead of from the right.
 * @param {function} fn 
 * @returns 
 */
export const leftVariadic = (fn) => {
    if (fn.length < 1) {
        return fn;
    }
    else {
        return function (...args) {
            const gathered = args.slice(0, args.length - fn.length + 1),
                spread = args.slice(args.length - fn.length + 1);
            return fn.apply(
                this, [gathered].concat(spread)
            );
        }
    }

};

/**
 * With leftGather, we have to supply the length of the array we wish to use as the result, and it gathers excess arguments into it from the left
 * @param {number} outputArrayLength 
 * @returns {Array}
 */
export const leftGather = (outputArrayLength) => {
    return function (inputArray) {
        return [inputArray.slice(0, inputArray.length - outputArrayLength + 1)].concat(
            inputArray.slice(inputArray.length - outputArrayLength + 1)
        )
    }
};