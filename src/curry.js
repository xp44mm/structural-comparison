export const curry = (fn) => {
    if (typeof fn !== 'function') {
        throw Error('No function provided');
    }

    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function (...args2) {
                return curriedFn(...args, ...args2);
            };
        }
        return fn(...args);
    };
};