import S from './sanitised'
import type Sid from './sanitised-identifier'

/** @returns `x` if sanitised, otherwise falls back to execute provided `f` and returns it's value. */
export const fallback =
  <T>(x: T, f: (_: Exclude<T, S | Sid>) => S): S =>
    x instanceof S ?
      x :
      f(x as Exclude<T, S | Sid>)

export default fallback
