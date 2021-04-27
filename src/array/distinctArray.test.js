import { distinctArray } from './distinctArray'

describe('distinctArray block', () => {
    test('distinctArray', () => {
        let x = ['B', 'C', 'B', 'A']
        let y = distinctArray(x)
        let e = ['B', 'C', 'A']
        expect(y).toEqual(e)
    })
})
