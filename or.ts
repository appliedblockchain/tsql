import auto from './auto'
import interpolate1 from './helpers/interpolate1'
import raw from './raw'
import S from './sanitised'
import template from './template'

// TODO: Don't do `auto` here, we know the shape of it better.
export const or =
  (...xs: unknown[]): S =>
    template`(${raw(interpolate1(xs.map(auto), raw(' or ')).join(''))})`

export default or
