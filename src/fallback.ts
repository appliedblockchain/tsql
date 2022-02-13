import S from './sanitised.js'
import type Sid from './sanitised-identifier.js'

/** @returns sanitised value as is, otherwise falls back to provided sanitation function. */
export const fallback =
  <T>(x: T, f: (_: Exclude<T, S | Sid>) => undefined | S): undefined | S =>
    x instanceof S ?
      x :
      f(x as Exclude<T, S | Sid>)

export default fallback
