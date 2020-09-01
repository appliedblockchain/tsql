import S from './sanitised'

/** @returns `x` if sanitised, otherwise falls back to execute provided `f` and returns it's value. */
export const fallback =
  <T>(x: T, f: (_: T) => S): S =>
    x instanceof S ?
      x :
      f(x)

export default fallback
