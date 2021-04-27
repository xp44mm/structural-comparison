import { groupArrayBy, groupSortedEntries } from './groupArrayBy'
import { defaultCompare } from '../comparison'

describe('groupArrayBy', function () {
    ///返回的group key不保留输入顺序。
    test('splits the list into groups according to the grouping function', function() {
        const students = [
            { name: 'Abby', score: 84 },
            { name: 'Brad', score: 73 },
            { name: 'Chris', score: 89 },
            { name: 'Dianne', score: 99 },
            { name: 'Eddy', score: 58 },
            { name: 'Fred', score: 67 },
            { name: 'Gillian', score: 91 },
            { name: 'Hannah', score: 78 },
            { name: 'Irene', score: 85 },
            { name: 'Jack', score: 69 },
        ]
        let grouping = student => (student.score > 80 ? '录取' : '淘汰')
        const x = groupArrayBy(students, grouping)

        //console.log(x)
        let y = [
            [
                '录取',
                [
                    { name: 'Abby', score: 84 },
                    { name: 'Chris', score: 89 },
                    { name: 'Dianne', score: 99 },
                    { name: 'Gillian', score: 91 },
                    { name: 'Irene', score: 85 },
                ],
            ],
            [
                '淘汰',
                [
                    { name: 'Brad', score: 73 },
                    { name: 'Eddy', score: 58 },
                    { name: 'Fred', score: 67 },
                    { name: 'Hannah', score: 78 },
                    { name: 'Jack', score: 69 },
                ],
            ],
        ]

        expect(x).toEqual(y)
    })

    test('sorted key value pairs', () => {
        //console.log(x)
        let x = [
            ['录取', { name: 'Abby', score: 84 }],
            ['录取', { name: 'Chris', score: 89 }],
            ['录取', { name: 'Dianne', score: 99 }],
            ['录取', { name: 'Gillian', score: 91 }],
            ['录取', { name: 'Irene', score: 85 }],
            ['淘汰', { name: 'Brad', score: 73 }],
            ['淘汰', { name: 'Eddy', score: 58 }],
            ['淘汰', { name: 'Fred', score: 67 }],
            ['淘汰', { name: 'Hannah', score: 78 }],
            ['淘汰', { name: 'Jack', score: 69 }],
        ]

        let e = groupSortedEntries(x, defaultCompare)
        let y = [
            [
                '录取',
                [
                    { name: 'Abby', score: 84 },
                    { name: 'Chris', score: 89 },
                    { name: 'Dianne', score: 99 },
                    { name: 'Gillian', score: 91 },
                    { name: 'Irene', score: 85 },
                ],
            ],
            [
                '淘汰',
                [
                    { name: 'Brad', score: 73 },
                    { name: 'Eddy', score: 58 },
                    { name: 'Fred', score: 67 },
                    { name: 'Hannah', score: 78 },
                    { name: 'Jack', score: 69 },
                ],
            ],
        ]

        expect(y).toEqual(e)
    })
})
