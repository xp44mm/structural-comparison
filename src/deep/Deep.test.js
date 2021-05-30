import { Deep } from './Deep'

let data = {
    a: {
        a: 0,
        b: 1,
    },
    b: [2, 3],
}

let entries = [[['a', 'a'], 0], [['a', 'b'], 1], [['b', 0], 2], [['b', 1], 3]]

test('constructor entries', () => {
    let entries = [[['a', 'a'], 0], [['a', 'b'], 1], [['b', 0], 2], [['b', 1], 3]]
    let deep = new Deep(entries)
    let y = deep.entries
    expect(y).toEqual(entries)
})

test('deep keys', () => {
    let entries = [[['a', 'a'], 0], [['a', 'b'], 1], [['b', 0], 2], [['b', 1], 3]]
    let deep = new Deep(entries)

    let keys = [['a', 'a'], ['a', 'b'], ['b', 0], ['b', 1]]
    expect(deep.keys).toEqual(keys)
})

test('deep getValues', () => {
    let entries = [[['a', 'a'], 0], [['a', 'b'], 1], [['b', 0], 2], [['b', 1], 3]]
    let deep = new Deep(entries)
    let values = [0, 1, 2, 3]
    expect(deep.getValues()).toEqual(values)
})

test('deep toObject', () => {
    let entries = [[['a', 'a'], 0], [['a', 'b'], 1], [['b', 0], 2], [['b', 1], 3]]
    let deep = new Deep(entries)
    let data = {
        a: {
            a: 0,
            b: 1,
        },
        b: [2, 3],
    }
    expect(deep.toObject()).toEqual(data)
})

test('deep findIndex', () => {
    let entries = [[['a', 'a'], 0], [['a', 'b'], 1], [['b', 0], 2], [['b', 1], 3]]
    let deep = new Deep(entries)
    let keyPath = ['a', 'b']
    expect(deep.findIndex(keyPath)).toEqual(1)
})

test('keys & values', () => {
    let entries = [[['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]

    let deep = new Deep(entries)

    let keys = [['a'], ['b'], ['c', 0], ['c', 1], ['c', 2, 'e']]

    expect(deep.keys).toEqual(keys)
    expect(deep.getValues()).toEqual([0, 1, 2, 3, 4])
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
        let deep = new Deep([[['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]])
        let keys = [['a'], ['b'], ['c', 0], ['c', 1], ['c', 2, 'e']]
        let y = deep.structuralEqual(keys)
        expect(y).toEqual(true)
    })

    test('structuralSubset', () => {
        let deep = new Deep([[['a'], 0], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]])
        let keys = [
            ['a'],
            ['b'], //*
            ['c', 0],
            ['c', 1],
            ['c', 2, 'e'],
        ]
        let y = deep.structuralSubset(keys)
        expect(y).toEqual(true)
    })

    test('structuralSuperset', () => {
        let deep = new Deep([[['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]])
        let keys = [
            ['a'],
            //['b'],
            ['c', 0],
            ['c', 1],
            ['c', 2, 'e'],
        ]
        let y = deep.structuralSuperset(keys)
        expect(y).toEqual(true)
    })
})
