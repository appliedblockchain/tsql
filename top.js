// @flow

const { inspect } = require('util')
const { round } = Math
const raw = require('./raw')
const number = require('./number')
const line = require('./line')
const auto = require('./auto')

/*:: import S from './sanitised' */

/** @returns top expression.
  @example``top(1, raw('with ties'))`
  @example `top(1, star)`
  @example `top(0.1, star)` value in <0,1> range returns percent, ie. `top 10 percent`.
  @example `top(1, ids('foo', 'bar', 'baz'))` */
const top /*: (x?: number, ...$ReadOnlyArray<S>) => S */ =
  (x = 1, ...rest) => {
    if (x <= 0) {
      throw new TypeError(`Expected positive value in top, got ${inspect(x)}.`)
    }
    const [ x_, percent ] = x < 1 ?
      [ round(x * 100), true ] :
      [ round(x), false ]
    return line(
      raw('top'),
      number(x_),
      percent ? raw('percent') : undefined,
      ...rest.map(auto)
    )
  }

module.exports = top
