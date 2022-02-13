import { inspect } from 'util'

/** @returns interpolated array with `y` elements. */
export const interpolate1 =
  <T, I>(xs: T[], y: I): (T | I)[] => {
    if (!Array.isArray(xs)) {
      throw new TypeError(`Expected xs to be an array, got ${inspect(xs)}.`)
    }
    if (!xs.length) {
      return []
    }
    const rs: (T | I)[] = [ xs[0] ]
    for (let i = 1; i < xs.length; i++) {
      rs.push(y)
      rs.push(xs[i])
    }
    return rs
  }

export default interpolate1
