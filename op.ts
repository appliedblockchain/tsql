import fallback from './fallback'
import id from './identifier'
import raw from './raw'
import type S from './sanitised'
import tsql from './template'

/**
 * @internal
 * @param op_ can leak unsanitised string if misused, hence @internal.
 */
export const op =
  (l: S | string, op_: S | string, r: unknown): S =>
    tsql`${fallback(l, id)} ${fallback(op_, raw)} ${r}`

export default op
