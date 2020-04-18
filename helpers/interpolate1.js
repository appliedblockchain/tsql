// @flow

const { inspect } = require('util')
const { isArray } = Array

/** @returns interpolated array with `y` elements. */
const interpolate1 /*: <T, I>($ReadOnlyArray<T>, I) => (T | I)[] */ =
  (xs, y) => {
    if (!isArray(xs)) {
      throw new TypeError(`Expected xs to be an array, got ${inspect(xs)}.`)
    }
    if (!xs.length) {
      return []
    }
    const rs = [ xs[0] ]
    for (let i = 1; i < xs.length; i++) {
      rs.push(y)
      rs.push(xs[i])
    }
    return rs
  }

module.exports = interpolate1
