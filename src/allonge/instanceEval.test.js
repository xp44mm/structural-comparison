import { instanceEval } from './instanceEval';
import { mapWith } from './mapWith'

test('getWith test', () => {
    let instance = { value: 2 }

    let y = instanceEval(instance)(function (x) {
        return this.value * x
    }, 2)

    expect(y).toEqual(4)
})

