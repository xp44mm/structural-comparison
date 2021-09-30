import { curry, equals, map, max, reduce, trim, identity } from 'ramda';

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}


var cond =
  /*#__PURE__*/
  curry(function cond(pairs) {
    var arity = reduce(max, 0, map(function (pair) {
      return typeof pair === 'function' ? pair.length : pair[0].length;
    }, pairs));

    return _arity(arity, function () {
      var idx = 0;

      while (idx < pairs.length) {
        let pair = pairs[idx];

        if (typeof pair === 'function') {
          let transformer = pair.apply(this, arguments);

          if (transformer) {
            return transformer;
          }
        } else if (Array.isArray(pair)) {
          let predicate = pair[0].apply(this, arguments);

          if (predicate) {
            let args = Array.from(arguments);
            args.push(predicate); // transformer(...arguments, predicate)

            return pair[1].apply(this, args);
          }
        }

        idx += 1;
      }
    });
  });


describe('cond new featrues', function () {

  it('just predicate and return result', function () {
    let sS = cond([trim]);
    let x = sS(" ")
    expect(x).toEqual(undefined)
    let y = sS("  x  ")
    expect(y).toEqual("x")
    let z = sS("")
    expect(z).toEqual(undefined)
  });

  it('storage predicate result', function () {
    let sS = cond([
      [trim, (_, res) => ({ res })],
    ]);
    let y = sS("  x  ")
    expect(y).toEqual({ res: "x" })
    let z = sS("")
    expect(z).toEqual(undefined)
    let x = sS(" ")
    expect(x).toEqual(undefined)
  });

  it('an example in world', function () {
    let token = cond([
      input => {
        let mtch = /^\d+/.exec(input)
        if (mtch && mtch.length > 0) {
          let lexeme = mtch[0]
          let restInput = input.slice(lexeme.length)
          return { token: { number: parseInt(lexeme) }, restInput }
        } else {
          return null
        }
      }
    ]);
    let y = token("123+234")
    expect(y).toEqual({ "restInput": "+234", "token": { "number": 123 } })
  });

});