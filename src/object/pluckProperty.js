///获取obj的一个嵌套属性
export function pluckProperty(obj, keyPath) {
    return keyPath.reduce((p, c) => p[c], obj)
}
