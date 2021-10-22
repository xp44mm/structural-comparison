import { bound } from './bound'
import { mapWith } from './mapWith'

function InventoryRecord(apples, oranges, eggs) {
    this.record = {
        apples: apples,
        oranges: oranges,
        eggs: eggs
    }
}

InventoryRecord.prototype.apples = function apples() {
    return this.record.apples
}

InventoryRecord.prototype.oranges = function oranges() {
    return this.record.oranges
}

InventoryRecord.prototype.eggs = function eggs() {
    return this.record.eggs
}

const inventories = [
    new InventoryRecord(0, 144, 36),
    new InventoryRecord(240, 54, 12),
    new InventoryRecord(24, 12, 42)
];


test('eggs test', () => {
    let y = mapWith(bound('eggs'))(inventories).map(
        boundmethod => boundmethod()
    )
    //=> [ 36, 12, 42 ]
    expect(y).toEqual([36, 12, 42])
})


InventoryRecord.prototype.add = function (item, amount) {
    this.record[item] || (this.record[item] = 0);
    this.record[item] += amount;
    return this;
}

test('add eggs test', () => {
    let y = mapWith(bound('add', 'eggs', 12))(inventories).map(
        boundmethod => boundmethod()
    )
    expect(y).toEqual([{
        record:
        {
            apples: 0,
            oranges: 144,
            eggs: 48
        }
    },
    {
        record:
        {
            apples: 240,
            oranges: 54,
            eggs: 24
        }
    },
    {
        record:
        {
            apples: 24,
            oranges: 12,
            eggs: 54
        }
    }])
})

test('bind test', () => {
    let add = (a, b) => a + b
    let y = add.bind(null, 10, 10)()
    expect(y).toEqual(20)
})
