import { compareKeyPath } from '../comparison'

/**
 * 返回一个新entries，每个entry的key都在keys中。
 * @param {any} entries
 * @param {any} keys
 */
export function intersectEntries(entries, keys) {
    ///由intersect修改而来
    let loop = (y = [], entries, keys) => {
        if (entries.length === 0 || keys.length === 0) {
            return y
        } else {
            switch (Math.sign(compareKeyPath(entries[0][0], keys[0]))) {
                case 0:
                    let yy = [...y, entries[0]]
                    return loop(yy, entries.slice(1), keys.slice(1))

                case -1:
                    return loop(y, entries.slice(1), keys)

                case 1:
                    return loop(y, entries, keys.slice(1))
            }
        }
    }
    return loop([], entries, keys)
}
