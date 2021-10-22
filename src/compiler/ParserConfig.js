
import { Stack } from './Stack'

const _rules_ = Symbol('rules')
const _actions_ = Symbol('actions')
const _kernelSymbols_ = Symbol('kernelSymbols')
const _getTag_ = Symbol('getTag')

export class ParserConfig {
    constructor({
        rules,
        actions,
        kernelSymbols,

    }) {
        this[_rules_] = new Map(rules)
        this[_actions_] = new Map(actions.map(([k, v]) => [k, new Map(v)]))
        this[_kernelSymbols_] = new Map(kernelSymbols)
    }

    setGetTag(getTag) {
        this[_getTag_] = getTag
    }

    parse(iterator) {
        const rules = this[_rules_]
        const actions = this[_actions_]
        const kernelSymbols = this[_kernelSymbols_]
        const getTag = this[_getTag_]

        const trees = new Stack()
        const states = Stack.of(0)

        const loop = (element) => {
            let sm = states.peek()
            let ai = element.value ? getTag(element.value) : ""

            if (actions.has(sm) && actions.get(sm).has(ai)) {
                // noop
            }
            else {
                let symbol = kernelSymbols.get(sm)
                let token = ai === "" ? "EOF" : ai
                throw new Error(
                    `ParserConfig.parse error: symbol='${symbol}'; state='${sm}'; lookahead='${token}'`
                )
            }

            let action = actions.get(sm).get(ai)
            if (action === 0)
                return trees
            else if (action > 0) {
                let state = action
                let tree = { token: element.value }
                trees.push(tree)
                states.push(state)
                return loop(iterator.next())
            }
            else if (action < 0) {
                let symbols = rules.get(action) //产生式符号列表。比如产生式 e-> e + e 的列表为 [e,e,+,e]
                let leftside = symbols[0]
                let len = symbols.length - 1 //产生式右侧符号的数量

                let children = trees.popMany(len)
                trees.push({ leftside, children })

                states.drop(len) // 弹出状态，产生式体
                let smr = states.peek() // = s_{m-r}
                let newstate = actions.get(smr).get(leftside)
                states.push(newstate)

                return loop(element)
            }
            else throw new Error("ParserConfig.parse error: never")
        }
        return loop(iterator.next())[0]
    }

}