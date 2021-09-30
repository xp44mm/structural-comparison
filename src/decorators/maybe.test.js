import { maybe } from './maybe.js'


describe('maybe', () => {

    test('maybe', () => {

        const someObject = {
            setSize: maybe(function (size) {
                this.size = size;
            })
        }

        someObject.setSize(5);
        expect(someObject.size).toEqual(5)

        someObject.setSize(null);
        expect(someObject.size).toEqual(5)


    })

})

const tortoiseAndHare = (iterable) => {
    const hare = iterable[Symbol.iterator]();

    let hareResult = (hare.next(), hare.next());

    for (let tortoiseValue of iterable) {
        hareResult = hare.next();

        if (hareResult.done) {
            return false;
        }

        if (tortoiseValue === hareResult.value) {
            return true;
        }

        hareResult = hare.next();

        if (hareResult.done) {
            return false;
        }
        if (tortoiseValue === hareResult.value) {
            return true;
        }
    }
    return false;
};

// implements Teleporting Tortoise
// cycle detection algorithm.
const hasCycle = (iterable) => {
    let iterator = iterable[Symbol.iterator](),
        teleportDistance = 1;
    while (true) {
        let { value, done } = iterator.next(),
            tortoise = value;
        if (done) return false;
        for (let i = 0; i < teleportDistance; ++i) {
            let { value, done } = iterator.next(),
                hare = value;
            if (done) return false;
            if (tortoise === hare) return true;
        }
        teleportDistance *= 2;
    }
    return false;
};

const hasCycle = (orderedCollection) => {
    const visited = new Set();
    for (let element of orderedCollection) {
        if (visited.has(element)) {
            return true;
        }
        visited.add(element);
    }
    return false;
};