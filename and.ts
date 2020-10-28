import auto from './auto'
import interpolate1 from './helpers/interpolate1'
import raw from './raw'
import template from './template'
import true_ from './true'
import type S from './sanitised'

export const and =
  (...xs: unknown[]): S => {
    const xs_ = xs.filter(_ => typeof _ !== 'undefined')
    if (!xs_.length) {
      return true_
    }
    return template`(${raw(interpolate1(xs_.map(auto), raw(' and ')).join(''))})`
  }

export default and
