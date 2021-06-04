describe('The definition of Infinity', () => {
    test('typeof', () => {
        expect(typeof Infinity).toEqual('number')
        expect(typeof -Infinity).toEqual('number')
    })

    test('Number', () => {
        expect(Number.POSITIVE_INFINITY).toEqual(Infinity)
        expect(Number.NEGATIVE_INFINITY).toEqual(-Infinity)
    })
})

describe('The properties of Infinity', () => {
    test('some examples', () => {
        expect(Infinity).toBeGreaterThan(100)
        expect(Infinity).toBeGreaterThan(Number.MAX_SAFE_INTEGER)
        expect(Infinity).toBeGreaterThan(Number.MAX_VALUE)
        expect(Infinity).toBeGreaterThan(100n)


    })

    test('arithmetical operations', () => {
        expect(Infinity + 1).toEqual(Infinity)
        expect(Infinity + Infinity).toEqual(Infinity)

        expect(Infinity * 2).toEqual(Infinity)
        expect(Infinity * Infinity).toEqual(Infinity)

        expect(Infinity / 2).toEqual(Infinity)
    })

    test('result in finite numbers', () => {
        expect(10 / Infinity).toEqual(0)
    })

    test('results in `Infinity`', () => {
        expect(10 / 0).toEqual(Infinity)
    })

    test('results in `NaN`', () => {
        expect(Infinity / Infinity).toBeNaN()
        expect(Infinity % 2).toEqual(NaN)
    })
})

describe('the negative infinity', () => {
    test('some examples', () => {
        expect(-Infinity).toBeLessThan(100)
        expect(-Infinity).toBeLessThan(Number.MIN_SAFE_INTEGER)
        expect(-Infinity).toBeLessThan(Number.MIN_VALUE)
        expect(-Infinity).toBeLessThan(Infinity)

    })

    test('end up in negative infinity', () => {
        expect(Infinity * -2).toEqual(-Infinity)
        expect(Infinity / -1).toEqual(-Infinity)
        expect(-2 / 0).toEqual(-Infinity)
    })

})


describe('Checking for *Infinity*', () => {
    test('an infinite value equals to an infinite value of the same sign', () => {
        expect(Infinity).toEqual(Infinity)
        expect(-Infinity).toEqual(-Infinity)
        expect(-Infinity).not.toEqual(Infinity)

    })

    test('whether the provided value is finite', () => {
        expect(Number.isFinite(Infinity)).toEqual(false)
        expect(Number.isFinite(-Infinity)).toEqual(false)
        expect(Number.isFinite(999)).toEqual(true)

    })

})

describe('*Infinity* use cases', () => {

})

describe('Pitfalls of *Infinity*', () => {
    test('Parsing numbers', () => {
        expect(parseFloat('Infinity')).toEqual(Infinity)
        expect(parseInt('Infinity', 10)).toEqual(NaN)
    })

    test('JSON serialization', () => {
        const worker = {
            salary: Infinity
        };

        let y = JSON.parse(JSON.stringify(worker))
        let e = { "salary": null }

        expect(y).toEqual(e)
    })

    test('Max number overflow', () => {

        expect(2 * Number.MAX_VALUE).toEqual(Infinity)
        expect(Math.pow(10, 1000)).toEqual(Infinity)

    })

    test('Math functions', () => {
        expect(Math.max()).toEqual(-Infinity)
        expect(Math.min()).toEqual(Infinity)

    })



})




