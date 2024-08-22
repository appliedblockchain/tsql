import fallback from './fallback.js'
import id from './identifier.js'
import isNull from './is-null.js'
import row from './row.js'
import tsql from './template.js'
import type S from './sanitised.js'

export const notIn =
  (l: S | string, r: undefined | null | unknown[]): undefined | S =>
    typeof r === 'undefined' ?
      undefined :
      r && !isNull(r) && (r.length > 0) ?
        tsql`${fallback(l, id)} not in ${row(r)}` :
        tsql`${fallback(l, id)} is not null`

export default notIn
