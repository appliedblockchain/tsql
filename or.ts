import auto from './auto'
import false_ from './false'
import interpolate1 from './helpers/interpolate1'
import raw from './raw'
import template from './template'
import type S from './sanitised'

// TODO: Don't do `auto` here, we know the shape of it better.
export const or =
  (...xs: unknown[]): S => {
    const xs_ = xs.filter(_ => typeof _ !== 'undefined')
    if (!xs_.length) {
      return false_
    }
    return template`(${raw(interpolate1(xs_.map(auto), raw(' or ')).join(''))})`
  }

export default or
