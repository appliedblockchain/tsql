import raw from './raw'
import tsql from './template'
import type S from './sanitised'

export const maybeWith =
  (lhs: S, hints?: string[]): S => {
    if (!hints?.length) {
      return lhs
    }
    return tsql`${lhs} with (${raw(hints.join(', '))})`
  }

export default maybeWith
