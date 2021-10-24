// import { BehaviorSubject } from 'rxjs'
import { pluckProperty } from '../object'
import { objectToDeep } from './objectToDeep'

test('', () => { })

// test('test objectToDeep', () => {
//     let observables = {
//         a: new BehaviorSubject(0),
//         c: [
//             new BehaviorSubject(0),
//             {
//                 e: new BehaviorSubject(0),
//             },
//         ],
//     }
//     let deep = objectToDeep(observables, (v, k, p) => v instanceof BehaviorSubject)

//     let keys = [
//         ['a'],
//         ['c', 0],
//         ['c', 1, 'e'],
//     ]

//     expect(deep.keys).toEqual(keys)

//     let entries = keys.map(k => [k, pluckProperty(observables, k)])
//     expect(deep.entries).toEqual(entries)

// })
