/**
 * here is an IterableDictionary that turns a collection into a function that 
 * is also iterable if its underlying data object is iterable:
 * @param {*} entries 
 * @returns 
 */
export const IterableDictionary = (entries) => {
    const proxy = (key) => entries[key];
    proxy[Symbol.iterator] = function* (...args) {
        yield* entries[Symbol.iterator](...args);
    }
    return proxy;
}