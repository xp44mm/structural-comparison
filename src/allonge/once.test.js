import { once } from './once.js'

describe('once', () => {
    test('once', () => {
        const askedOnBlindDate = once(
            () => "sure, why not?"
        );

        let x = askedOnBlindDate()
        expect(x).toEqual('sure, why not?')

        let y = askedOnBlindDate()
        expect(y).toEqual(undefined)

        let z = askedOnBlindDate()
        expect(z).toEqual(undefined)

    })

})
