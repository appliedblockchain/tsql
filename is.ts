const is =
  <Lhs, Rest extends unknown[], R>(f: (lhs: Lhs, ...args: Rest) => R, ...args: Rest): ((lhs: Lhs) => R) =>
    (lhs: Lhs): R =>
      f(lhs, ...args)

export default is
