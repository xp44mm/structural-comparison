export function FunctionalMixin(behaviour, sharedBehaviour = {}) {
    const instanceKeys = Reflect.ownKeys(behaviour);
    const sharedKeys = Reflect.ownKeys(sharedBehaviour);
    const typeTag = Symbol("isA");
    function mixin(target) {
        for (let property of instanceKeys)
            if (!target[property])
                Object.defineProperty(target, property, {
                    value: behaviour[property],
                    writable: true
                })
        target[typeTag] = true;
        return target;
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