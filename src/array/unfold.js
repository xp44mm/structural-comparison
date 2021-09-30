export function unfold(f, init) {
    const g = (f, next, acc) => {
      const result = f(next);
      const [head, last] = result || [];
    //   console.log(last);
      return result ? g(f, last, acc.concat(head)) : acc;
    };
    return g(f, init, []);
  }
  
  range = R.curry((first, last, step) =>
    unfold(next => next < last && [next, next + step], 0)
  )
  
  // 执行
  range(0, 100, 5)