import { rangeArray } from "./rangeArray"

/// Array.zip
export function zipArray(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        throw new Error("arrayZip(a,b):both a and b should be array")
    }

    let len = Math.max(a.length, b.length)

    return rangeArray(len).map(i => [a[i], b[i]])
}

