import fallback from './fallback.js'
import id from './identifier.js'
import isNull from './is-null.js'
import nstring from './nstring.js'
import tsql from './template.js'
import type S from './sanitised.js'

const rhsLike =
  (rhs: unknown): S =>
    isNull(rhs) ?
      tsql`is null` :
      tsql`like ${nstring(String(rhs))}`

/**
 * @returns LIKE operator.
 *
 * `undefined` is propagated.
 */
export const like =
  (lhs: S | string, rhs: unknown): undefined | S =>
    typeof rhs === 'undefined' ?
      undefined :
      tsql`${fallback(lhs, id)} ${rhsLike(rhs)}`

export default like
