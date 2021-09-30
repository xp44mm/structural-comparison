import { maybe } from './maybe.js'

describe('maybe', () => {
    test('without null', () => {
        let y = maybe((a, b, c) => a + b + c)(1, 2, 3)
        expect(y).toEqual(6)
    })

    test('null', () => {
        let y = maybe((a, b, c) => a + b + c)(1, null, 3)
        expect(y).toEqual(undefined)
    })


    test('model', () => {

        class Model {
            constructor() {
                this.setSomething = maybe(this.setSomething)
            }
            setSomething(value) {
                this.something = value;
            }
        }
        let model = new Model()
        model.setSomething(1)
        model.setSomething(null)

        let y = model.something
        expect(y).toEqual(1)
    })




})
