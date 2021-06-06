import { unionDeep } from './unionDeep'

test('unionDeep test', () => {
    let deep1 = [
        [["a", "b"], 0],
        [["a", "c"], 1], //*
    ]

    let deep2 = [
        [["a", "c"], 'x'], //*
        [["a", "d"], 2],
        [["a", "e"], 3],
        [["f"], 4],
    ]

    //a,b中的键不能重复
    let y = unionDeep([deep1, deep2])
    let e = [
        [["a", "b"], 0],
        [["a", "c"], 1], //*
        [["a", "c"], 'x'], //*
        [["a", "d"], 2],
        [["a", "e"], 3],
        [["f"], 4],
    ]
    expect(y.entries).toEqual(e)
})

describe('unionDeep block', () => {


})
