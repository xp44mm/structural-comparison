import { Deep } from './Deep'


test('keys & values', () => {
    let entries = [[['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]

    let deep = new Deep(entries)

    let keys = [['a'], ['b'], ['c', 0], ['c', 1], ['c', 2, 'e']]

    expect(deep.keys).toEqual(keys)
    expect(deep.values).toEqual([0, 1, 2, 3, 4])
})

test('find index', () => {
    let entries = [[['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]

    let deep = new Deep(entries)

    let i = deep.findIndex(['c', 0])
    expect(i).toEqual(2)

    let j = deep.findIndex(['no exist', 0])
    expect(j).toEqual(-1)
})

test('test to object', () => {
    let entries = [[['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]

    let deep = new Deep(entries)
    let obj = {
        a: 0,
        b: 1,
        c: [
            2,
            3,
            {
                e: 4,
            },
        ],
    }

    expect(deep.toObject()).toEqual(obj)
})


describe('structural comparison', () => {
    test('structuralEqual', () => {

        let entries = [[['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]
        let deep = new Deep(entries)
        let keys = [
            ['a'], 
            ['b'],
            ['c', 0],
            ['c', 1],
            ['c', 2, 'e'],
        ]

        expect(deep.structuralEqual(keys)).toEqual(true)
    })

    test('structuralSubset', () => {

        let entries = [[['a'], 0], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]
        let deep = new Deep(entries)
        let keys = [
            ['a'], 
            ['b'],
            ['c', 0],
            ['c', 1],
            ['c', 2, 'e'],
        ]

        expect(deep.structuralSubset(keys)).toEqual(true)
    })

    test('structuralSuperset', () => {

        let entries = [[['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]
        let deep = new Deep(entries)
        let keys = [
            ['a'],
            //['b'],
            ['c', 0],
            ['c', 1],
            ['c', 2, 'e'],
        ]

        expect(deep.structuralSuperset(keys)).toEqual(true)
    })


})
