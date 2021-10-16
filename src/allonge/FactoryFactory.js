/**
 * FactoryFactory turns any “red” class into a “blue” function.
 * @param {ObjectConstructor} clazz is a class
 * @returns  {function}
 */
export const FactoryFactory = (clazz) =>
    (...args) =>
        new clazz(...args);