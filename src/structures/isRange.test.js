import { isRange } from "./isRange"

test('isRange test', () => {
    let act = isRange(['0', '1', '2'])
    expect(act).toEqual(true)
})
