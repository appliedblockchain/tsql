import fallback from './fallback.js'
import id from './identifier.js'
import isNull from './is-null.js'
import type S from './sanitised.js'
import tsql from './template.js'

export const ne =
  (lhs: S | string, rhs: unknown): undefined | S => {
    if (typeof rhs === 'undefined') {
      return undefined
    }
    const l_ = fallback(lhs, id)
    return isNull(rhs) ?
      tsql`${l_} is not null` :
      tsql`${l_} <> ${rhs}`
  }

export default ne
