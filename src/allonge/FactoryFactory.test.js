import { FactoryFactory } from './FactoryFactory'

class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    diameter() {
        return Math.PI * 2 * this.radius;
    }
    scaleBy(factor) {
        return new Circle(factor * this.radius);
    }
}

test('eggs test', () => {
    const CircleFactory = FactoryFactory(Circle);
    let y = CircleFactory(5).diameter()
    expect(y).toEqual(31.41592653589793)
})

test('map test', () => {
    let y = [1, 2, 3, 4, 5].map(FactoryFactory(Circle))
    let z = [{ "radius": 1 }, { "radius": 2 }, { "radius": 3 }, { "radius": 4 }, { "radius": 5 }]
    expect(y).toEqual(z)
})
