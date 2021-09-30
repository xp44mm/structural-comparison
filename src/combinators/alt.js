import { curry } from 'ramda'

function loop(branchs, input) {
    if (branchs.length > 0) {
        // 取出第一个匹配器
        let [branch, ...restbranchs] = branchs
        // 执行匹配器，获得结果
        let result = branch(input)
        if (result) {
            return result
        } else {
            // 继续看后面的匹配器是否得到结果
            return loop(restbranchs, input)
        }
    } else { // 没有匹配
        return null
    }
}

///
export const alt = curry(loop)
