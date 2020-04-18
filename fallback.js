// @flow

const S = require('./sanitised')

/** @returns `x` if sanitised, otherwise falls back to execute provided `f` and returns it's value. */
const fallback /*: (any, any => S) => S */ =
  (x, f) =>
    x instanceof S ?
      x :
      f(x)

module.exports = fallback
