import fallback from './fallback.js'
import id from './identifier.js'
import isNil from './helpers/is-nil.js'
import row from './row.js'
import tsql from './template.js'
import type S from './sanitised.js'

export const notIn =
  (l: S | string, r: undefined | null | unknown[]): undefined | S =>
    typeof r === 'undefined' ?
      undefined :
      r && !isNil(r) && r.length ?
        tsql`${fallback(l, id)} not in ${row(r)}` :
        tsql`${fallback(l, id)} is not null`

export default notIn
