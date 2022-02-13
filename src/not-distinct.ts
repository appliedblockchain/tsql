import fallback from './fallback.js'
import id from './identifier.js'
import template from './template.js'
import type S from './sanitised.js'

export const notDistinct =
  (lhs: S | string, rhs: unknown): undefined | S => {
    if (typeof lhs === 'undefined' || typeof rhs === 'undefined') {
      return undefined
    }
    const lhs_ = fallback(lhs, id)
    return template`(not (${lhs_} <> ${rhs} or ${lhs_} is null or ${rhs} is null) or (${lhs_} is null and ${rhs} is null))`
  }

export default notDistinct
