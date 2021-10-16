
import { ClassMixin } from './ClassMixin'

const BookCollector = ClassMixin({
    addToCollection(name) {
        this.collection().push(name);
        return this;
    },
    collection() {
        return this._collected_books || (this._collected_books = []);
    }
});

// class Person {
//     constructor(first, last) {
//         this.rename(first, last);
//     }
//     fullName() {
//         return this.firstName + " " + this.lastName;
//     }
//     rename(first, last) {
//         this.firstName = first;
//         this.lastName = last;
//         return this;
//     }
// };

// BookCollector(Person);


const Person = BookCollector(class {
    constructor(first, last) {
        this.rename(first, last);
    }
    fullName() {
        return this.firstName + " " + this.lastName;
    }
    rename(first, last) {


        this.firstName = first;
        this.lastName = last;
        return this;
    }
});


test('BookCollector test', () => {
    const president = new Person('Barak', 'Obama')

    president
        .addToCollection("JavaScript Allongé")
        .addToCollection("Kestrels, Quirky Birds, and Hopeless Egocentricity");
    const y = president.collection()
    expect(y).toEqual(["JavaScript Allongé", "Kestrels, Quirky Birds, and Hopeless Egocentricity"])
})

