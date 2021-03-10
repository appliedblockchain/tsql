import type S from './sanitised'
import raw from './raw'

/** @see `falseValue`. */
export const logicalFalse: S =
  raw('0=1')

export default logicalFalse
