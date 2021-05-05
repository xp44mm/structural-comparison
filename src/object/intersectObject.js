/**
 * Creates an object composed of the picked object properties.
 * @param {object} obj
 * @param {string[]} keys
 */
export const intersectObject = (obj, keys) =>
    Object.fromEntries(
        keys
            .filter(key => key in obj)
            .map(key => [key, obj[key]])
    )

//intersectObject