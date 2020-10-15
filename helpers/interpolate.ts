import { inspect } from 'util'

/** @returns interpolated array `xs` with values from `ys`; empty array if both arrays are empty.
    @throws if `xs.length - 1 !== ys.length` */
export const interpolate =
  <T, I>(xs: TemplateStringsArray | T[], ys: I[]): (string | T | I)[] => {
    if (!Array.isArray(xs) || !Array.isArray(ys)) {
      throw new TypeError(`Expected xs and ys to be an array, got ${inspect(xs)} and ${inspect(ys)}.`)
    }
    if (!xs.length && !ys.length) {
      return []
    }
    if (xs.length - 1 !== ys.length) {
      throw new TypeError(`Expected xs and ys length to be correct, got ${inspect(xs.length)} and ${inspect(ys.length)}.`)
    }
    const rs: (T | I | string)[] = [ xs[0] ]
    for (let i = 0; i < ys.length; i++) {
      rs.push(ys[i])
      rs.push(xs[i + 1])
    }
    return rs
  }

export default interpolate
