export const fluent = (method) =>
    function(...args) {
        method.apply(this, args);
        return this;
    }