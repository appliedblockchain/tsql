import auto from './auto.js'
import line from './line.js'
import number from './number.js'
import raw from './raw.js'
import type S from './sanitised.js'

/**
 * @returns top expression.
 * @example top(1, raw('with ties'))
 * @example top(1, star)
 * @example top(0.1, star) // value in <0,1> range returns percent, ie. `top 10 percent`.
 * @example top(1, ids('foo', 'bar', 'baz'))
 */
export const top =
  (x = 1, ...rest: S[]): S => {
    if (x <= 0) {
      throw new TypeError(`Expected positive value in top, got ${x}.`)
    }
    const [ x_, percent ] = x < 1 ?
      [ Math.round(x * 100), true ] :
      [ Math.round(x), false ]
    return line(
      raw('top'),
      number(x_),
      percent ? raw('percent') : undefined,
      ...rest.map(auto)
    )
  }

export default top
