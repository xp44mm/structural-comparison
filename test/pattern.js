export const primitive = (primitive) => ({ primitive })
export const type = (type) => ({ type })
export const wild = (wild) => ({ wild })
export const fixedArray = (...fixedArray) => ({ fixedArray })
export const variadicArray = (firstArray, lastArray) => ({ variadicArray: [firstArray, lastArray] })
export const exactObject = (...props) => ({ exactObject: props })
export const compatObject = (...props) => ({ compatObject: props })
export const either = (x, y) => ({ either: [x, y] })




