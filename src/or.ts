import auto from './auto.js'
import logicalFalse from './logical-false.js'
import interpolate1 from './interpolate1.js'
import raw from './raw.js'
import template from './template.js'
import type S from './sanitised.js'

// TODO: Don't do `auto` here, we know the shape of it better.
export const or =
  (...xs: unknown[]): S => {
    const xs_ = xs.filter(_ => typeof _ !== 'undefined')
    if (!xs_.length) {
      return logicalFalse
    }
    return template`(${raw(interpolate1(xs_.map(auto), raw(' or ')).join(''))})`
  }

export default or
