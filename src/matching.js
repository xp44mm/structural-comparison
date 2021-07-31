import { trampoline } from './trampoline'

function loop(matchers, input) {
    if (matchers.length > 0) {
        //取出第一个匹配器
        let [matcher, ...restMatchers] = matchers
        //执行匹配器，获得结果
        let res = matcher(input)
        if (res) {
            //如果结果不为空，获得结果
            return res
        } else {
            //继续看后面的匹配器是否得到结果
            return () => matching(restMatchers, input)
        }
    } else {
        //没有匹配返回空
        return null
    }
}

const iterate = trampoline(loop)


export function matching(matchers = [], input) {
    return iterate(matchers, input)
}
