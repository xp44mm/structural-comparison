import { erectObject, tojs } from './erectObject'

describe('test erectObject', () => {
    let data = {
        inlet: {
            SO2: 0,
            SO3: 1,
            HCl: 2,
        },
        effect: {
            SO2: 5,
            SO3: 6,
            HCl: 7,
        },
        arr: [10, 11, 12],
        dirtyLeakage: 13,
        cleanLeakage: 14,
    }

    let entries = [
        [['inlet', 'SO2'], 0],
        [['inlet', 'SO3'], 1],
        [['inlet', 'HCl'], 2],
        [['effect', 'SO2'], 5],
        [['effect', 'SO3'], 6],
        [['effect', 'HCl'], 7],
        [['arr', 0], 10],
        [['arr', 1], 11],
        [['arr', 2], 12],
        [['dirtyLeakage'], 13],
        [['cleanLeakage'], 14],
    ]

    let sortedEntries = [
        [['arr', 0], 10],
        [['arr', 1], 11],
        [['arr', 2], 12],
        [['cleanLeakage'], 14],
        [['dirtyLeakage'], 13],
        [['effect', 'HCl'], 7],
        [['effect', 'SO2'], 5],
        [['effect', 'SO3'], 6],
        [['inlet', 'HCl'], 2],
        [['inlet', 'SO2'], 0],
        [['inlet', 'SO3'], 1],
    ]


    test('tojs test', () => {
        //先排序
        let x = sortedEntries
        let y = tojs(x)

        let r = {
            arr: [10, 11, 12],
            cleanLeakage: 14,
            dirtyLeakage: 13,
            effect: { HCl: 7, SO2: 5, SO3: 6 },
            inlet: { HCl: 2, SO2: 0, SO3: 1 }
        }

        expect(y).toEqual(r)
    })

    test('erectObject test', () => {
        //输入的词条可以不排序，这个词条用到tojs中将会使c丢失成员。
        let entries = [
            [['c', 1], 3],
            [['a'], 0],
            [['b', 'a'], 1],
            [['c', 0], 2],
        ]

        let y = erectObject(entries)

        let e = {
            a: 0,
            b: { a: 1 },
            c: [2, 3]
        }

        expect(y).toEqual(e)
    })

    test('tojs test', () => {
        let entries = [
            [['a'], 0],
            [['b', 'a'], 1],
            [['c', 0], 2],
            [['c', 1], 3],
        ]

        let y = tojs(entries)

        let e = {
            a: 0,
            b: { a: 1 },
            c: [2, 3]
        }

        expect(y).toEqual(e)
    })


})
