import auto from './auto.js'
import list from './list.js'
import raw from './raw.js'
import type S from './sanitised.js'

/** @returns sanitised */
export const row =
  <T>(xs: T[], f: (_: T) => S = auto): S =>
    raw('(' + String(list(xs, f)) + ')')

export default row
