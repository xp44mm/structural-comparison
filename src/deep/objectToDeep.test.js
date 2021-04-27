import { BehaviorSubject } from 'rxjs'
import { objectToDeep } from "./objectToDeep"

let observables = {
    a: new BehaviorSubject(0),
    b: new BehaviorSubject(0),
    c: [
        new BehaviorSubject(0),
        new BehaviorSubject(0),
        {
            e: new BehaviorSubject(0),
        },
    ],
}

let entries = [
    [['a'], 0],
    [['b'], 0],
    [['c', 0], 0],
    [['c', 1], 0],
    [['c', 2, 'e'], 0]
]

test('test fromObject', () => {
    let deep = objectToDeep(observables, (v, k, p) => v instanceof BehaviorSubject)
    let y = deep.entries.map(([k, bs]) => [k, bs.value])
    expect(y).toEqual(entries)
})
