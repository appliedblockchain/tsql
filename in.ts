import id from './identifier'
import tsql from './template'
import fallback from './fallback'
import isNil from './helpers/is-nil'
import row from './row'
import type S from './sanitised'
import false_ from './false'

export const in_ =
  (l: S | string, r: undefined | null | unknown[]): undefined | S =>
    typeof r === 'undefined' ?
      undefined :
      r && !isNil(r) && r.length ?
        tsql`${fallback(l, id)} in ${row(r)}` :
        false_

export default in_
