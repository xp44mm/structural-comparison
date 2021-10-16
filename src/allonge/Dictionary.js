/**
 * Here’s Dictionary, a function that turns objects and arrays (our “charmed” functions) into ordinary (“blue”) functions:
 * @param {*} data 
 * @returns {function}
 */
export const Dictionary = (data) => (key) => data[key];