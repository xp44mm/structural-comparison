/**
 * getWith takes the name of an attribute and returns a function that extracts the value of that attribute from an object.
 * @param {string} attr 
 * @returns 
 */
export const getWith = (attr) => (object) => object[attr]
