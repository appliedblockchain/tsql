import fallback from './fallback'
import id from './identifier'
import isNil from './helpers/is-nil'
import tsql from './template'
import type S from './sanitised'

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
