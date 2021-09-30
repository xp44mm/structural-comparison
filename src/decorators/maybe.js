export const maybe = (fn) =>
    function (...args) {
        for (const i in args) {
            if (args[i] == null) return args[i];
        }
        return fn.apply(this, args);
    };