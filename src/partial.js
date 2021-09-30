export const partial = function (fn, ...partialArgs) {
    let args = partialArgs;
    return function (...fullArguments) {
        let arg = 0;
        for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
            if (args[i] === undefined) {
                args[i] = fullArguments[arg++];
            }
        }
        return fn(...args);
    };
};

// let delayTenMs = partial(setTimeout,undefined,10);
// delayTenMs(() => console.log("Do Y task"))