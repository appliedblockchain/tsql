import fallback from './fallback.js'
import id from './identifier.js'
import raw from './raw.js'
import type S from './sanitised.js'
import tsql from './template.js'

/**
 * @internal
 * @param op_ can leak unsanitised string if misused, hence internal.
 */
export const op =
  (l: S | string, op_: S | string, r: unknown): undefined | S =>
    typeof r === 'undefined' ?
      undefined :
      tsql`${fallback(l, id)} ${fallback(op_, raw)} ${r}`

export default op
