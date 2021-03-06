import auto from './auto'
import interpolate1 from './helpers/interpolate1'
import raw from './raw'
import template from './template'
import logicalTrue from './logical-true'
import type S from './sanitised'

/** @returns sanitised and operator. `undefined` terms are dropped. Empty list of terms returns true (1=1). */
export const and =
  (...xs: unknown[]): S => {
    const xs_ = xs.filter(_ => typeof _ !== 'undefined')
    if (!xs_.length) {
      return logicalTrue
    }
    return template`(${raw(interpolate1(xs_.map(auto), raw(' and ')).join(''))})`
  }

export default and
