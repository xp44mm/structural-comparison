///输入的数组是[0,1,2,...]
export function isRange(keys) {
    if (keys.every(key => /^\d+$/.test(key))) {
        let nums = keys.map(key => parseInt(key))
        return nums.every((v, i) => v === i)
    }
    return false
}
