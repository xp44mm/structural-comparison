import { flat } from './flat'

describe('test flatten', () => {
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

    test('默认标量为叶节点', function () {
        let act = flat(data)
        expect(act).toEqual(entries)
    })


    test('Date & regex', function () {
        let obj = {
            date: new Date(),
            regex: /./
        }

        let act = flat(obj)

        let y = [
            [['date'], obj.date],
            [['regex'], obj.regex],
        ]

        expect(act).toEqual(y)
    })

    test('空对象為葉節點', function () {
        let empty = {
            array: [],
            obj: {}
        }

        let act = flat(empty)

        let y = [
            [['array'], []],
            [['obj'], {}],
        ]

        expect(act).toEqual(y)
    })

    test('array as leaf', function () {
        let data = {
            a: {
                a: 0,
                b: 1,
            },
            b: [0, 1, 2]
        }

        let e = [
            [['a', 'a'], 0],
            [['a', 'b'], 1],
            [['b'], [0, 1, 2]],
        ]

        let y = flat(data, (v, k, path) => Array.isArray(v))


        expect(y).toEqual(e)
    })



})
