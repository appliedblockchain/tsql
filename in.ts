import id from './identifier'
import tsql from './template'
import fallback from './fallback'
import isNil from './helpers/is-nil'
import row from './row'
import type S from './sanitised'
import logicalFalse from './logical-false'

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
      r && !isNil(r) && r.length ?
        tsql`${fallback(l, id)} in ${row(r)}` :
        logicalFalse

export default in_
