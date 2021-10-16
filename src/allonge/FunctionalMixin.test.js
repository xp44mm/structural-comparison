import { FunctionalMixin } from './FunctionalMixin'

class Todo {
    constructor(name) {
        this.name = name || 'Untitled';
        this.done = false;
    }
    do() {
        this.done = true;
        return this;
    }
    undo() {
        this.done = false;
        return this;
    }
}

const Coloured = FunctionalMixin({
    setColourRGB({ r, g, b }) {
        this.colourCode = { r, g, b };
        return this;
    },
    getColourRGB() {
        return this.colourCode;
    }
}, {
    RED: { r: 255, g: 0, b: 0 },
    GREEN: { r: 0, g: 255, b: 0 },
    BLUE: { r: 0, g: 0, b: 255 },
});

Coloured(Todo.prototype)

test('matched test', () => {
    const urgent = new Todo("finish blog post");
    urgent.setColourRGB({ r: 256, g: 0, b: 0 });
    let arr = []
    for (let property in urgent) arr.push(property);
    // console.log(arr)
    expect(arr).toEqual(['name', 'done', 'colourCode'])
})

test('mixin responsibilities test', () => {
    const urgent = new Todo("finish blog post");
    urgent.setColourRGB(Coloured.RED);
    let y = urgent.getColourRGB()
    let z = { "r": 255, "g": 0, "b": 0 }
    expect(y).toEqual(z)
})

test('mixin methods test', () => {
    const urgent = new Todo("finish blog post");
    expect(urgent instanceof Todo).toEqual(true)
})

const BookCollector = FunctionalMixin({
    addToCollection(name) {
        this.collection().push(name);
        return this;
    },
    collection() {
        return this._collected_books || (this._collected_books = []);
    }
});

class Person {
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
};

BookCollector(Person.prototype);

test('BookCollector test', () => {
    const president = new Person('Barak', 'Obama')
    president
        .addToCollection("JavaScript Allongé")
        .addToCollection("Kestrels, Quirky Birds, and Hopeless Egocentricity");
    const y = president.collection()
    expect(y).toEqual(["JavaScript Allongé", "Kestrels, Quirky Birds, and Hopeless Egocentricity"])
})


