import { Dictionary } from './Dictionary'


const personToDrink = {
    Bob: 'Ristretto',
    Carol: 'Cappuccino',
    Ted: 'Allongé',
    Alice: 'Cappuccino'
}



test('eggs test', () => {
    let y = ['Bob', 'Ted', 'Carol', 'Alice'].map(Dictionary(personToDrink))
    let e = ["Ristretto", "Allongé", "Cappuccino", "Cappuccino"]
    expect(y).toEqual(e)
})

test('eggs test', () => {

    const IterableDictionary = (data) => {
        const proxy = (key) => data[key];
        proxy[Symbol.iterator] = function* (...args) {
            yield* data[Symbol.iterator](...args);
        }
        return proxy;
    }

    const people = IterableDictionary(['Bob', 'Ted', 'Carol', 'Alice']);

    const drinks = IterableDictionary(personToDrink);
    let arr = []
    for (let name of people) {
        arr.push(`${name} prefers to drink ${drinks(name)}`)
    }
    expect(arr).toEqual([
        'Bob prefers to drink Ristretto',
        'Ted prefers to drink Allongé',
        'Carol prefers to drink Cappuccino',
        'Alice prefers to drink Cappuccino',
    ])

})

