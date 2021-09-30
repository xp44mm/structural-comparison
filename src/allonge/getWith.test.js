import { getWith } from './getWith';
import { mapWith } from './mapWith';
import { maybe } from './maybe';


test('getWith test', () => {
    const inventory = {
        apples: 0,
        oranges: 144,
        eggs: 36
    };

    let y = getWith('oranges')(inventory)
    //=> 144

    expect(y).toEqual(144)
})

test('compose test', () => {
    const inventories = [
        { apples: 0, oranges: 144, eggs: 36 },
        { apples: 240, oranges: 54, eggs: 12 },
        { apples: 24, oranges: 12, eggs: 42 }
    ];

    let y = mapWith(getWith('oranges'))(inventories)

    //=> [ 144, 54, 12 ]

    expect(y).toEqual([144, 54, 12])

    let x = mapWith(maybe(getWith('oranges')))(inventories)
    expect(x).toEqual([144, 54, 12])

})

