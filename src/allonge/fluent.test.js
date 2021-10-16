import { fluent } from './fluent'

test('coupling code', () => {
    class Cake {
        setFlavour(flavour) {
            this.flavour = flavour;
            return this
        }
        setLayers(layers) {
            this.layers = layers;
            return this
        }
        bake() {
            // do some baking
            return this
        }
    }

    const cake = new Cake()

    cake.
        setFlavour('chocolate').
        setLayers(3).
        bake();

    expect(cake).toEqual({ flavour: "chocolate", layers: 3, })
})


test('cake test', () => {
    class Cake {
        setFlavour(flavour) {
            this.flavour = flavour;
        }
        setLayers(layers) {
            this.layers = layers;
        }
        bake() {
            // do some baking
        }
    }

    Cake.prototype.setFlavour = fluent(Cake.prototype.setFlavour);
    Cake.prototype.setLayers = fluent(Cake.prototype.setLayers);
    Cake.prototype.bake = fluent(Cake.prototype.bake);

    const cake = new Cake()

    cake.
        setFlavour('chocolate').
        setLayers(3).
        bake();

    expect(cake).toEqual({ flavour: "chocolate", layers: 3, })
})


test('extends test', () => {
    class Cake {
        setFlavour(flavour) {
            this.flavour = flavour;
        }
        setLayers(layers) {
            this.layers = layers;
        }
        bake() {
            // do some baking
        }
    }

    class FluentCake extends Cake {
        setFlavour(flavour) {
            super.setFlavour(flavour)
            return this
        }
        setLayers(layers) {
            super.setLayers(layers)
            return this
        }
        bake() {
            // do some baking
            super.bake()
            return this
        }
    }

    const cake = new FluentCake()

    cake.
        setFlavour('chocolate').
        setLayers(3).
        bake();

    expect(cake).toEqual({ flavour: "chocolate", layers: 3, })
})



test('mixins test', () => {
    class Cake {
        setFlavour(flavour) {
            this.flavour = flavour;
        }
        setLayers(layers) {
            this.layers = layers;
        }
        bake() {
            // do some baking
        }
    }

    const Fluent = (superclass) => class Fluent extends superclass {
        setFlavour(flavour) {
            super.setFlavour(flavour)
            return this
        }
        setLayers(layers) {
            super.setLayers(layers)
            return this
        }
        bake() {
            // do some baking
            super.bake()
            return this
        }
    }

    const FluentCake = Fluent(Cake)

    const cake = new FluentCake()
    cake.
        setFlavour('chocolate').
        setLayers(3).
        bake();
    expect(cake).toEqual({ flavour: "chocolate", layers: 3, })
})

