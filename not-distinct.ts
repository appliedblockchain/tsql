import fallback from './fallback'
import id from './identifier'
import template from './template'
import type S from './sanitised'

export const notDistinct =
  (lhs: S | string, rhs: unknown): undefined | S => {
    if (typeof lhs === 'undefined' || typeof rhs === 'undefined') {
      return undefined
    }
    const lhs_ = fallback(lhs, id)
    return template`(not (${lhs_} <> ${rhs} or ${lhs_} is null or ${rhs} is null) or (${lhs_} is null and ${rhs} is null))`
  }

export default notDistinct
