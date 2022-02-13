import fallback from './fallback.js'
import id from './identifier.js'
import isNil from './helpers/is-nil.js'
import tsql from './template.js'
import type S from './sanitised.js'

const rhsEq =
  (rhs: unknown): S =>
    isNil(rhs) ?
      tsql`is null` :
      tsql`= ${rhs}`

/**
 * @returns comparision expression.
 *
 * `null` RHS returns LHS IS NULL.
 *
 * `undefined` RHS propagates.
 *
 * @see distinct for NULL aware comparision.
 */
export const eq =
  (lhs: S | string, rhs: unknown): undefined | S =>
    typeof rhs === 'undefined' ?
      undefined :
      tsql`${fallback(lhs, id)} ${rhsEq(rhs)}`

export default eq
