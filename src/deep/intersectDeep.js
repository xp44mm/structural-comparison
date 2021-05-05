import { Deep } from './Deep'
import { intersectEntries } from './intersectEntries'

//部分路徑,keys需要升序切不重复。
export const intersectDeep = keys => deep => {
    let entries = intersectEntries(deep.entries, keys)
    return new Deep(entries)
}
