import { Stack } from './Stack'

test('constructor 0', () => {
    let stack = new Stack()
    expect([...stack]).toEqual([]);
});

test('constructor 1', () => {
    let stack = Stack.of(0)
    expect([...stack]).toEqual([0]);
});

test('peek', () => {
    let stack = Stack.of(0, 1)
    let y = stack.peek()
    expect(y).toEqual(1);
    expect([...stack]).toEqual([0, 1]);
});

test('push', () => {
    let stack = new Stack()
    stack.push(1)
    stack.push(2)
    expect(stack.length).toEqual(2);
    expect([...stack]).toEqual([1, 2]);
});

test('pop 1', () => {
    let stack = Stack.of(0, 1)
    let y = stack.pop()
    expect(y).toEqual(1);
    expect([...stack]).toEqual([0]);
});

test('pop 3', () => {
    let stack = Stack.of(0, 1, 2, 3, 4, 5)
    let y = stack.pop(3)
    expect(y).toEqual([3, 4, 5]);
    expect([...stack]).toEqual([0, 1, 2]);
});


