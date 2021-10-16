export function* getAllConstructorNames(prototype) {
    if (prototype.hasOwnProperty("constructor"))
        yield prototype.constructor.name
    let proto = Object.getPrototypeOf(prototype)
    if (proto) yield* getAllConstructorNames(proto)
}