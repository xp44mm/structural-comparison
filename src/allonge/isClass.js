import { getAllConstructorNames } from './getAllConstructorNames'

export const isClass = (obj, constructorName) => {
    for (const name of getAllConstructorNames(obj)) {
        if (name === constructorName) return true
    }
    return false
}