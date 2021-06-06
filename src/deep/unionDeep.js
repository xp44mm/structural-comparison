import { compareEntries } from "./compareEntries"
import { Deep } from "./Deep"

export function unionDeep(deeps) {
    let entries =
        deeps.map(deep => {
            if (deep instanceof Deep) {
                return deep.entries
            } else if (Array.isArray(deep)) {
                return deep // deep === entries
            } else {
                throw new TypeError('should be Deep or entries')
            }
        }).reduce((acc, entries) => [...acc, ...entries], [])
            .sort(compareEntries)
    return new Deep(entries)
}