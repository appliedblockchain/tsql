import type S from './sanitised'
import raw from './raw'

/** @see `logicalTrue`. */
export const trueValue: S =
  raw('cast(1 as bit)')

export default trueValue
