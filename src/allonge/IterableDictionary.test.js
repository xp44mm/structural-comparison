import { IterableDictionary } from './IterableDictionary'


test('eggs test', () => {
    const personToDrink = {
        Bob: 'Ristretto',
        Carol: 'Cappuccino',
        Ted: 'Allongé',
        Alice: 'Cappuccino'
    }

    const people = IterableDictionary(Object.keys(personToDrink));
    const drinks = IterableDictionary(personToDrink);

    let y = []

    for (let name of people) {
        y.push(`${name} prefers to drink ${drinks(name)}`)
    }

    expect(y).toEqual([
        "Bob prefers to drink Ristretto",
        "Ted prefers to drink Allongé",
        "Carol prefers to drink Cappuccino",
        "Alice prefers to drink Cappuccino",

    ])
})


