import { once } from './once.js'

describe('once', () => {
    test('once', () => {
        const askedOnBlindDate = once(
            () => "sure, why not?"
        );

        let x = askedOnBlindDate()
        expect(x).toEqual('sure, why not?')

        let y = askedOnBlindDate()
        expect(y).toEqual(undefined)

        let z = askedOnBlindDate()
        expect(z).toEqual(undefined)

    })

})

class Person {
    setName(first, last) {
        this.firstName = first;
        this.lastName = last;
        // return this;
    }
    fullName() {
        return this.firstName + " " + this.lastName;
    }
};

Object.defineProperty(Person.prototype, 'setName', {
    value: once(Person.prototype.setName)
});

test('smoke', () => {
    const logician = new Person()
    logician.setName('Raymond', 'Smullyan')
    logician.setName('Haskell', 'Curry');
    let y = logician.fullName()
    expect(y).toEqual('Raymond Smullyan')
})

test('multi', () => {
    const logician = new Person()
    logician.setName('Raymond', 'Smullyan');
    let y = logician.fullName()
    expect(y).toEqual('Raymond Smullyan')

    const musician = new Person()
    musician.setName('Miles', 'Davis');
    let z = musician.fullName()
    expect(z).toEqual('Miles Davis')

})


