import fallback from './fallback.js'
import id from './identifier.js'
import isNil from './helpers/is-nil.js'
import type S from './sanitised.js'
import tsql from './template.js'

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
