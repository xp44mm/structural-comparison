import { invoke } from './invoke';
import { mapWith } from './mapWith'

test('getWith test', () => {
    const data = [
        {
            0: 'zero',
            1: 'one',
            2: 'two',
            length: 3
        },
        {
            0: 'none',
            length: 1
        },
    ];

    let y = mapWith(invoke([].slice, 0))(data)

    let e = [
        ["zero", "one", "two"],
        ["none"],
    ]

    expect(y).toEqual(e)
})

