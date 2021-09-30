const iterable = {
    [Symbol.iterator]() {
        let step = 0
        const iterator = {
            next() {
                if (step <= 2) {
                    step++
                }
                switch (step) {
                    case 1:
                        return { value: 'hello', done: false }
                    case 2:
                        return { value: 'world', done: false }
                    default:
                        return { value: undefined, done: true }
                }
            },
        }
        return iterator
    },
}
function objectEntries(obj) {
    let iter = Reflect.ownKeys(obj)[Symbol.iterator]()

    return {
        [Symbol.iterator]() {
            return this
        },
        next() {
            let { done, value: key } = iter.next()
            if (done) {
                return { done: true }
            }
            return { value: [key, obj[key]] }
        },
    }
}

function iterateOver(...args) {
    let index = 0
    const iterable = {
        [Symbol.iterator]() {
            return this
        },
        next() {
            if (index < args.length) {
                return { value: args[index++] }
            } else {
                return { done: true }
            }
        },
    }

    return iterable
}

function objectEntries(obj) {
    let index = 0

    // In ES6, you can use strings or symbols as property keys,
    // Reflect.ownKeys() retrieves both
    const propKeys = Reflect.ownKeys(obj)

    return {
        [Symbol.iterator]() {
            return this
        },
        next() {
            if (index < propKeys.length) {
                const key = propKeys[index]
                index++
                return { value: [key, obj[key]] }
            } else {
                return { done: true }
            }
        },
    }
}

const obj = { first: 'Jane', last: 'Doe' }
for (const [key, value] of objectEntries(obj)) {
    console.log(`${key}: ${value}`)
}

// Output:
// first: Jane
// last: Doe

function take(n, iterable) {
    const iter = iterable[Symbol.iterator]()
    return {
        [Symbol.iterator]() {
            return this
        },
        next() {
            if (n > 0) {
                n--
                return iter.next()
            } else {
                return { done: true }
            }
        },
    }
}
const arr = ['a', 'b', 'c', 'd']
for (const x of take(2, arr)) {
    console.log(x)
}
// Output:
// a
// b

function zip(...iterables) {
    const iterators = iterables.map(i => i[Symbol.iterator]())
    let done = false
    return {
        [Symbol.iterator]() {
            return this
        },
        next() {
            if (!done) {
                const items = iterators.map(i => i.next())
                done = items.some(item => item.done)
                if (!done) {
                    return { value: items.map(i => i.value) }
                }
                // Done for the first time: close all iterators
                for (const iterator of iterators) {
                    if (typeof iterator.return === 'function') {
                        iterator.return()
                    }
                }
            }
            // We are done
            return { done: true }
        },
    }
}
function createIterable() {
    let done = false;
    const iterable = {
        [Symbol.iterator]() { return this; },
        next() {
            if (!done) {
                done = true;
                return { value: 'a' };
            } else {
                return { done: true };
            }
        },
        return() {
            console.log('return() was called!');
        },
    };
    return iterable;
}

for (const x of createIterable()) {
    console.log(x);
    // There is only one value in the iterable and
    // we abort the loop after receiving it
    break;
}
// Output:
// a
// return() was called!

class PreventReturn {
    constructor(iterator) {
        this.iterator = iterator;
    }
    /** Must also be iterable, so that for-of works */
    [Symbol.iterator]() {
        return this;
    }
    next() {
        return this.iterator.next();
    }
    return(value = undefined) {
        return { done: false, value };
    }
    // Not relevant for iterators: `throw()`
}


test('check that iterable is, in fact, iterable:', () => {
    for (const x of iterable) {
        console.log(x)
    }
    // Output:
    // hello
    // world
})
