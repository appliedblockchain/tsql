import interpolate1 from './helpers/interpolate1'
import raw from './raw'
import template from './template'
import auto from './auto'
import type S from './sanitised'

export const and =
  (...xs: unknown[]): S =>
    template`(${raw(interpolate1(xs.map(auto), raw(' and ')).join(''))})`

export default and
