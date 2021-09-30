export const seq = function (...funcs) {
    return function (val) {
        return funcs.map(function (fn) {
            return fn(val);
        });
    };
};