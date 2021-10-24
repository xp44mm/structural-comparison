import { cond } from './cond'

describe('cond', () => {
  test('returns a function', () => {
    let y = typeof cond([])
    expect(y).toEqual('function');
  });

  test('returns a conditional function', () => {
    let fn = cond([
      [x => x === 0, x => ('water freezes at 0°C')],
      [x => x === 100, x => ('water boils at 100°C')],
      [x => true, function (temp) { return 'nothing special happens at ' + temp + '°C'; }]
    ]);

    expect(fn(0)).toEqual('water freezes at 0°C');
    expect(fn(50)).toEqual('nothing special happens at 50°C');
    expect(fn(100)).toEqual('water boils at 100°C');
  });

  test('returns a function which returns undefined if none of the predicates matches', () => {
    let fn = cond([
      [x => x === ('foo'), x => (1)],
      [x => x === ('bar'), x => (2)]
    ]);
    expect(fn('quux')).toEqual(undefined);
  });

  test('predicates are tested in order', () => {
    let fn = cond([
      [x => true, x => ('foo')],
      [x => true, x => ('bar')],
      [x => true, x => ('baz')]
    ]);
    expect(fn()).toEqual('foo');
  });

  test('forwards all arguments to predicates and to transformers', () => {
    let fn = cond([
      [function (_, x) { return x === 42; }, (...args) => args]
    ]);
    expect(fn(21, 42, 84)).toEqual([21, 42, 84, true]);
  });

});

describe('cond new featrues', () => {

  test('just predicate and return result', () => {
    let fmt = cond([x => x.trim()]);
    let x = fmt(" ")
    expect(x).toEqual(undefined)
    let y = fmt("  x  ")
    expect(y).toEqual("x")
    let z = fmt("")
    expect(z).toEqual(undefined)
  });

  test('cache predicate result', () => {
    let fmt = cond([
      [x => x.trim(), (_, res) => ({ res })],
    ]);
    let y = fmt("  x  ")
    expect(y).toEqual({ res: "x" })
    let z = fmt("")
    expect(z).toEqual(undefined)
    let x = fmt(" ")
    expect(x).toEqual(undefined)
  });

  test('an example in world', () => {
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