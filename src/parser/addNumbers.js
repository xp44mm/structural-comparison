export function getRulesMap(rules) {
    let ls =
        rules.map((symbols,i) => [-i, symbols]) // 产生式负数编号
    return new Map(ls)
}