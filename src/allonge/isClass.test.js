import { isClass } from './isClass'
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
}

const HasManager = Sup => class HasManager extends Sup {
    setManager(manager) {
        this.removeManager();
        this.manager = manager;
        manager.addReport(this);
        return this;
    }
    removeManager() {
        if (this.manager) {
            this.manager.removeReport(this);
            this.manager = undefined;
        }
        return this;
    }
};

class Manager extends Person {
    constructor(first, last) {
        super(first, last)
    }
    addReport(report) {
        this.reports().add(report);
        return this;
    }
    removeReport(report) {
        this.reports().delete(report);
        return this;
    }
    reports() {
        return this._reports || (this._reports = new Set());
    }
}

class MiddleManager extends HasManager(Manager) {
    constructor(first, last) {
        super(first, last);
    }
}

class Worker extends HasManager(Person) {
    constructor(first, last) {
        super(first, last);
    }
}

test('Worker test', () => {
    const obj = new Worker('Fred', 'Rogers');
    let y = isClass(obj, 'HasManager')
    expect(y).toEqual(true)

    let z = isClass(obj, 'Person')
    expect(z).toEqual(true)

})

test('false test', () => {
    const obj = new Worker('Fred', 'Rogers');
    let y = isClass(obj, 'XXXX')
    expect(y).toEqual(false)
})
