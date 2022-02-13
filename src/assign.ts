import id from './identifier.js'
import tsql from './template.js'
import type S from './sanitised.js'
import type Sid from './sanitised-identifier.js'

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
