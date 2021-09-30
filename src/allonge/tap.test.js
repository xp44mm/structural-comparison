import { tap } from './tap.js'

describe('tap', () => {
    test('curried', () => {
        let output = []
        let y = tap('espresso')((it) => {
            output.push(`Our drink is '${it}'`)
        });
        expect(output[0]).toEqual("Our drink is 'espresso'")
        expect(y).toEqual('espresso')
    })

    test('uncurried', () => {
        let output = []
        let y = tap('espresso', (it) => {
            output.push(`Our drink is '${it}'`)
        });
        expect(output[0]).toEqual("Our drink is 'espresso'")
        expect(y).toEqual('espresso')
    })

    test('to do nothing at all', () => {
        let output = []
        let y = tap('espresso')()
        expect(output.length).toEqual(0)
        expect(y).toEqual('espresso')
    })


})

