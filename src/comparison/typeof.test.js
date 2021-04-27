describe('Basic usage', () => {
    test('Number', () => {
        expect(typeof 37).toEqual('number');
        expect(typeof 3.14).toEqual('number');
        expect(typeof (42)).toEqual('number');
        expect(typeof Math.LN2).toEqual('number');
        expect(typeof Infinity).toEqual('number');
        expect(typeof NaN).toEqual('number'); // Despite being "Not-A-Number"
        expect(typeof Number('1')).toEqual('number');      // Number tries to parse things into numbers
        expect(typeof Number('shoe')).toEqual('number');   // including values that cannot be type coerced to a number

        expect(typeof 42n).toEqual('bigint');
    })

    test('String', () => {
        expect(typeof '').toEqual('string');
        expect(typeof 'bla').toEqual('string');
        expect(typeof `template literal`).toEqual('string');
        expect(typeof '1').toEqual('string'); // note that a number within a string is still typeof string
        expect(typeof (typeof 1)).toEqual('string'); // typeof always returns a string
        expect(typeof String(1)).toEqual('string'); // String converts anything into a string, safer than toString
    })

    test('Boolean', () => {
        expect(typeof true).toEqual('boolean');
        expect(typeof false).toEqual('boolean');
        expect(typeof Boolean(1)).toEqual('boolean'); // Boolean() will convert values based on if they're truthy or falsy
        expect(typeof !!(1)).toEqual('boolean'); // two calls of the ! (logical NOT) operator are equivalent to Boolean()
    })

    test('Symbol', () => {
        expect(typeof Symbol()).toEqual('symbol')
        expect(typeof Symbol('foo')).toEqual('symbol')
        expect(typeof Symbol.iterator).toEqual('symbol')
    })

    test('Undefined', () => {
        expect(typeof undefined).toEqual('undefined')
        expect(typeof declaredButUndefinedVariable).toEqual('undefined')
        expect(typeof undeclaredVariable).toEqual('undefined')
    })

    test('Object', () => {
        expect(typeof { a: 1 }).toEqual('object')

        // use Array.isArray or Object.prototype.toString.call
        // to differentiate regular objects from arrays
        expect(typeof [1, 2, 4]).toEqual('object')

        expect(typeof new Date()).toEqual('object')
        expect(typeof /regex/).toEqual('object') // See Regular expressions section for historical results

        // The following are confusing, dangerous, and wasteful. Avoid them.
        expect(typeof new Boolean(true)).toEqual('object')
        expect(typeof new Number(1)).toEqual('object')
        expect(typeof new String('abc')).toEqual('object')
    })

    test('Function', () => {
        expect(typeof function () { }).toEqual('function')
        expect(typeof class C { }).toEqual('function')
        expect(typeof Math.sin).toEqual('function')
    })
})
