import fallback from './fallback'
import id from './identifier'
import isNil from './helpers/is-nil'
import type S from './sanitised'
import tsql from './template'

export const ne =
  (l: S | string, r: unknown): undefined | S => {
    if (typeof r === 'undefined') {
      return undefined
    }
    const l_ = fallback(l, id)
    return isNil(r) ?
      tsql`${l_} is not null` :
      tsql`${l_} <> ${r}`
  }

export default ne
