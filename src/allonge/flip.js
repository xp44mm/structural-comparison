/**
 * self-currying flip Sometimes we’ll want to flip a function, but retain the flexibility to call it in its curried 
 * form (pass one parameter) or non-curried form (pass both). 
 * @param {*} fn 2 parameters function
 * @returns 
 */
export const flip = (fn) =>
    function (first, second) {
        if (arguments.length === 2) {
            return fn.call(this, second, first);
        }
        else if (arguments.length === 1){
            return function (second) {
                return fn.call(this, second, first);
            };
        }else{
            throw new Error('flip arguments too more or too less')
        };
    };