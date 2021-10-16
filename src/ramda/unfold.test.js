import { unfold } from './unfold.js'

describe('unfold', function () {
  test('unfolds simple functions with a starting point to create a list', function () {
    let fn = function (n) { if (n > 0) { return [n, n - 1]; } }
    let seed = 10
    let y = unfold(fn, seed)
    let res = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    expect(y).toEqual(res);
  });

  test('is cool!', function () {
    let fib = function (n) {
      let count = 0;
      return function (pair) {
        count += 1;
        if (count <= n) {
          return [pair[0], [pair[1], pair[0] + pair[1]]];
        }
      };
    };
    let fn = fib(10)
    let seed = [0, 1]
    let y = unfold(fn, seed)
    let res = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
    expect(y).toEqual(res);
  });

});
