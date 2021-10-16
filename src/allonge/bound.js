/**
 * bound can be used to get a bound method from an instance. There’s an option to add a variable number of additional arguments.
 * @param {string} methodName 
 * @param  {...any} args 
 * @returns 
 */
export const bound = (methodName, ...args) =>
    (args.length === 0)
        ? instance => instance[methodName].bind(instance)
        : instance => Function.prototype.bind.apply(
            instance[methodName], [instance].concat(args)
        );
