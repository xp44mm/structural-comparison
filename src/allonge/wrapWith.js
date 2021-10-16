/**
 * The wrapWith function takes an ordinary method decorator and turns it into an method decorator.
 * @param {*} decorator 
 * @returns 
 */
export const wrapWith = (decorator) =>
    function (target, name, descriptor) {
        descriptor.value = decorator(descriptor.value);
    }

    