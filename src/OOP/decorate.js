//Object.defineProperty(Person.prototype, 'setName', { value: fluent(Person.prototype.setName) });

/**
 * 装扮类的某个方法
 * @param {*} Clazz 
 * @param {*} method 
 * @param {*} decorator 
 * @returns 
 */
export const decorate = (Clazz, method, decorator) =>
    Object.defineProperty(Clazz.prototype, method, {
        value: decorator.call(this, Clazz.prototype[method])
    });
