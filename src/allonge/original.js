/**
 * There is one sure cure for “JavaScript Impostor Syndrome.”  creates an original, canonicalized primitive from a primitive or an instance of a primitive object.
 * @param {*} unknown a primitive or an instance of a primitive object
 * @returns primitive
 */
export const original = function (unknown) {
    return unknown.constructor(unknown)
}