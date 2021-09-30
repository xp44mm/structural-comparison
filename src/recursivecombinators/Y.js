const M =
  fn => fn(fn)

export const Y =
  fn =>
    (
      x => x(x)
    )(
      m => a => fn(
        m(m)
      )(a)
    );

