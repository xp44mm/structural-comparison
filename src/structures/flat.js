/**
 * 扁平化对象或数组，输入参数与JSON.stringify相同。
 * @param {any} data
 * @param {function} filter 当过滤器函数返回真时，属性作为叶节点。
 * @returns {[(string|number)[],any][]}
 */
export const flat = (data, filter = () => false) => {
    function loop(acc, keyPath, key, value) {
        keyPath = [...keyPath, key]
        if (filter(value, key, keyPath)) {
            // 首先拦截叶节点
            return [...acc, [keyPath, value]]
        } else if (value && typeof value === 'object') {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
            // 内置对象为叶节点
            if (
                value instanceof Function ||
                value instanceof Boolean ||
                value instanceof Symbol ||
                value instanceof Error ||
                value instanceof Number ||
                value instanceof BigInt ||
                value instanceof Date ||
                value instanceof String ||
                value instanceof RegExp ||
                value instanceof Map ||
                value instanceof Set ||
                value instanceof WeakMap ||
                value instanceof WeakSet
            ) {
                return [...acc, [keyPath, value]]
            }
            //空數組為葉節點
            if (Array.isArray(value) && value.length === 0) {
                return [...acc, [keyPath, value]]
            }

            //空对象为页节点
            if (Object.keys(value).length === 0) {
                return [...acc, [keyPath, value]]
            }

            // date,regex
            let entries = Array.isArray(value) ? [...value.entries()] : Object.entries(value)

            if (entries.length > 0) {
                //附加当前对象包含的所有词条到词条累加器后面
                return entries.map(([k, v]) => loop([], keyPath, k, v)).reduce((a, b) => [...a, ...b], acc)
            } else {
                return [...acc, [keyPath, value]]
            }
        } else {
            return [...acc, [keyPath, value]]
        }
    }

    try {
        return loop([], [], '', data).map(
            //删除辅助的第一层路段: ['', ...paths] -> paths
            ([[_, ...keyPath], value]) => [keyPath, value]
        )
    } catch (ex) {
        console.error('flat', ex.message)
    }
}
