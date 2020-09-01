import auto from './auto'
import list from './list'
import raw from './raw'
import S from './sanitised'

/** @returns sanitised */
export const row =
  <T>(xs: T[], f: (_: T) => S = auto): S =>
    raw('(' + String(list(xs, f)) + ')')

export default row
