import id from './identifier'
import tsql from './template'
import type S from './sanitised'
import type Sid from './sanitised-identifier'

/**
 * @returns assigment operator LHS = RHS.
 *
 * `undefined` RHS is propagated.
 *
 * `null` RHS is left as is LHS = null.
 */
export const assign =
  (lhs: Sid | string, rhs: unknown): undefined | S =>
    typeof rhs === 'undefined' ?
      undefined :
      tsql`${id(lhs)} = ${rhs}`

export default assign
