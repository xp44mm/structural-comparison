/**
 * Send is useful when invoking a function that’s a member of an object (or of an instance’s prototype).
 * @param {string} methodName 
 * @param  {...any} args 
 * @returns 
 */
export const send = (methodName, ...args) =>
    (instance) => instance[methodName].apply(instance, args);
