class Container {
    constructor(val) {
        this.value = val;
    }

    map(fn){
        return new Container(fn(this.value));
      }
}