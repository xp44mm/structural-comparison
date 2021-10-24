import { SubclassFactory } from './SubclassFactory'
import { getAllConstructorNames } from '../allonge'

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
    toHTML() {
        return this.name; // highly insecure
    }
}

let yellow = { r: 'FF', g: 'FF', b: '00' },
    red = { r: 'FF', g: '00', b: '00' },
    green = { r: '00', g: 'FF', b: '00' },
    grey = { r: '80', g: '80', b: '80' };

let oneDayInMilliseconds = 1000 * 60 * 60 * 24;

const ColouredAsWellAs = SubclassFactory({
    setColourRGB({ r, g, b }) {
        this.colourCode = { r, g, b };
        return this;
    },
    getColourRGB() {
        return this.colourCode;
    }
});

class TimeSensitiveTodo extends ColouredAsWellAs(Todo) {
    constructor(name, deadline) {
        super(name);
        this.deadline = deadline;
    }

    getColourRGB() {
        let slack = this.deadline - Date.now();
        if (this.done) {
            return grey;
        }
        else if (slack <= 0) {
            return red;
        }
        else if (slack <= oneDayInMilliseconds) {
            return yellow;

        }
        else return green;
    }

    toHTML() {
        let rgb = this.getColourRGB();
        return `<span style="color: #${rgb.r}${rgb.g}${rgb.b};">${super.toHTML()}</span>`;
    }
}

test('TimeSensitiveTodo test', () => {
    const obj = new TimeSensitiveTodo('Fred', 1);
    let instances = [...getAllConstructorNames(obj)]
    expect(instances).toEqual(['TimeSensitiveTodo', 'Todo', 'Todo', 'Object'])
})

