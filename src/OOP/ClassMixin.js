export function ClassMixin(behaviour, sharedBehaviour = {}) {
    const instanceKeys = Reflect.ownKeys(behaviour);
    const sharedKeys = Reflect.ownKeys(sharedBehaviour);
    const typeTag = Symbol("isA");
    function mixin(clazz) {
        for (let property of instanceKeys)
            if (!clazz.prototype[property])
                Object.defineProperty(clazz.prototype, property, {
                    value: behaviour[property],
                    writable: true
                });
        clazz.prototype[typeTag] = true;
        return clazz;
    }
    for (let property of sharedKeys)
        Object.defineProperty(mixin, property, {
            value: sharedBehaviour[property],
            enumerable: sharedBehaviour.propertyIsEnumerable(property)
        });
    Object.defineProperty(mixin, Symbol.hasInstance,
        { value: (instance) => !!instance[typeTag] });
    return mixin;
}