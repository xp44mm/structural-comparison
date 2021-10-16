import { pluckWith } from './pluckWith';


test('pluckWith test', () => {
    const inventories = [
        { apples: 0, oranges: 144, eggs: 36 },
        { apples: 240, oranges: 54, eggs: 12 },
        { apples: 24, oranges: 12, eggs: 42 }
    ];

    let y = pluckWith('oranges')(inventories)
    expect(y).toEqual([144, 54, 12])

})

