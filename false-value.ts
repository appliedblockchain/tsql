import type S from './sanitised'
import raw from './raw'

/** @see `logicalFalse`. */
export const falseValue: S =
  raw('cast(0 as bit)')

export default falseValue
