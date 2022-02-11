import fallback from './fallback'
import id from './identifier'
import template from './template'
import type S from './sanitised'

/**
 * @returns emulated NULL aware comparision.
 *
 * MSSQL doesn't support IS DISTINCT FROM comparision directly.
 *
 * Single invocation of RHS is not guaranteed.
 */
export const distinct =
  (lhs: S | string, rhs: unknown): undefined | S => {
    if (typeof lhs === 'undefined' || typeof rhs === 'undefined') {
      return undefined
    }
    const lhs_ = fallback(lhs, id)
    return template`((${lhs_} <> ${rhs} or ${lhs_} is null or ${rhs} is null) and not (${lhs_} is null and ${rhs} is null))`
  }

export default distinct
