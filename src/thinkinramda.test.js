test('empty test', () => {
    function* empty() { };
    let y = empty().next()
    expect(y).toEqual({ "done": true })
})

function* only(something) {
    yield something;
};

test('fresh test', () => {
    let y = only("you").next()
    expect(y).toEqual({ "done": false, value: "you" })

    let x = only("you").next()


    expect(x).toEqual({ "done": false, value: "you" })

    let z = only("the lonely").next()

    expect(z).toEqual({ "done": false, value: "the lonely" })


})


test('same iterator twice:', () => {
    const sixteen = only("sixteen");

    let x = sixteen.next()
    expect(x).toEqual({ "done": false, value: "sixteen" })

    let y = sixteen.next()
    expect(y).toEqual({ "done": true })

})

const oneTwoThree = function* () {
    yield 1;
    yield 2;
    yield 3;
};

test('oneTwoThree', () => {
    let x =
        oneTwoThree().next()
    expect(x).toEqual({ "done": false, value: 1 })

    let y =
        oneTwoThree().next()
    expect(y).toEqual({ "done": false, value: 1 })

    let z =
        oneTwoThree().next()
    expect(z).toEqual({ "done": false, value: 1 })

})

test('oneTwoThree', () => {

    const iterator = oneTwoThree();
    let x =
        iterator.next()
    expect(x).toEqual({ "done": false, value: 1 })

    let y =
        iterator.next()
    expect(y).toEqual({ "done": false, value: 2 })

    let z =
        iterator.next()
    expect(z).toEqual({ "done": false, value: 3 })

    let t =
        iterator.next()
    expect(t).toEqual({ "done": true })


})

