import id from './identifier.js'
import tsql from './template.js'
import fallback from './fallback.js'
import isNull from './is-null.js'
import row from './row.js'
import type S from './sanitised.js'
import logicalFalse from './logical-false.js'

/**
 * @returns LHS in (RHS) expression.
 *
 * `undefined` RHS propagates.
 *
 * Falsy or empty array RHS returns logical false.
 */
export const in_ =
  (l: S | string, r: undefined | null | unknown[]): undefined | S =>
    typeof r === 'undefined' ?
      undefined :
      r && !isNull(r) && (r.length > 0) ?
        tsql`${fallback(l, id)} in ${row(r)}` :
        logicalFalse

export default in_
