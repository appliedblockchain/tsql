import auto from './auto.js'
import interpolate1 from './helpers/interpolate1.js'
import raw from './raw.js'
import template from './template.js'
import logicalTrue from './logical-true.js'
import type S from './sanitised.js'

/**
 * @returns terms joined with AND operator.
 *
 * `undefined` terms are filtered out.
 *
 * An empty list of terms returns logical true (1=1).
 */
export const and =
  (...xs: unknown[]): S => {
    const xs_ = xs.filter(_ => typeof _ !== 'undefined')
    if (!xs_.length) {
      return logicalTrue
    }
    return template`(${raw(interpolate1(xs_.map(auto), raw(' and ')).join(''))})`
  }

export default and
