import S from './sanitised'
import type Sid from './sanitised-identifier'

/** @returns sanitised value as is, otherwise falls back to provided sanitation function. */
export const fallback =
  <T>(x: T, f: (_: Exclude<T, S | Sid>) => S): S =>
    x instanceof S ?
      x :
      f(x as Exclude<T, S | Sid>)

export default fallback
