export const instanceEval = instance =>
    (fn, ...args) => fn.apply(instance, args);