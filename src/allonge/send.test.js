import { send } from './send'
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

test('apples test', () => {
    let y = mapWith(send('apples'))(inventories)
    expect(y).toEqual([0, 240, 24])
})


