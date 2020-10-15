import auto from './auto'
import raw from './raw'
import type S from './sanitised'

/** @returns a line constructed from components; undefined values are filtered out. */
export const line =
  (...xs: unknown[]): S =>
    raw(xs.filter(_ => typeof _ !== 'undefined').map(auto).map(_ => _.toString().trim()).join(' '))

export default line
