import fallback from './fallback'
import id from './identifier'
import isNil from './helpers/is-nil'
import row from './row'
import tsql from './template'
import type S from './sanitised'

export const notIn =
  (l: S | string, r: undefined | null | unknown[]): undefined | S =>
    typeof r === 'undefined' ?
      undefined :
      r && !isNil(r) && r.length ?
        tsql`${fallback(l, id)} not in ${row(r)}` :
        tsql`${fallback(l, id)} is not null`

export default notIn
