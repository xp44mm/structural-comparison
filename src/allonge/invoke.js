export const invoke = (fn, ...args) =>
    instance => fn.apply(instance, args);