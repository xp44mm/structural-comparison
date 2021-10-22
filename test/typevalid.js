import { cond } from '../src/ramda/cond';


export const primitive = (primitive) => ({ primitive })
export const type = (type) => ({ type })
export const wild = (wild) => ({ wild })
export const fixedArray = (...fixedArray) => ({ fixedArray })
export const variadicArray = (firstArray, lastArray) => ({ variadicArray: [firstArray, lastArray] })
export const exactObject = (...props) => ({ exactObject: props })
export const compatObject = (...props) => ({ compatObject: props })
export const either = (x, y) => ({ either: [x, y] })

let isPrimitive = (value) => (obj) => obj === value
let isType = (type) => (obj) => typeof obj === type
let isWild = () => (obj) => true

let isFixedArray = (...elements) => obj =>
    Array.isArray(obj) && obj.length === elements.length && obj.every((e, i) => typevalid(e, elements[i]))

let isVariadicArray = (firstArray, lastArray) => obj =>
    Array.isArray(obj) && obj.length === firstArray.length + lastArray.length && 
    firstArray.every((e, i) => typevalid(e, obj[i])) &&
    lastArray.every((e, i) => typevalid(e, obj[obj.length - 1 - i]))



