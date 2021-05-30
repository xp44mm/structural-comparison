///與immutable.getIn相同，只是可以是類實例也迭代。
export function extractProperty(obj, keyPath) {
    return keyPath.reduce((p, c) => p[c], obj)
}
