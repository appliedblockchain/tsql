import interpolate1 from './helpers/interpolate1'
import raw from './raw'
import template from './template'
import auto from './auto'
import Sanitised from './sanitised'

export const and =
  (...xs: unknown[]): Sanitised =>
    template`(${raw(interpolate1(xs.map(auto), raw(' and ')).join(''))})`

export default and
