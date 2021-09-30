export function* logAndYield(iterable, prefix='') {
    for (const item of iterable) {
        console.log(prefix + item);
        yield item;
    }
}

