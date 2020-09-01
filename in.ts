import id from './identifier'
import tsql from './template'
import fallback from './fallback'
import isNil from './helpers/is-nil'
import row from './row'
import S from './sanitised'

export const in_ =
  (l: S | string, r?: null | unknown[]): S => {
    const l_ = fallback(l, id)
    return r && !isNil(r) && r.length ?
      tsql`${l_} in ${row(r)}` :
      tsql`${l_} in (null)`
  }

export default in_
