import fallback from './fallback'
import id from './identifier'
import isNil from './helpers/is-nil'
import row from './row'
import type S from './sanitised'
import tsql from './template'

export const notIn =
  (l: S | string, r: unknown[]): S => {
    const l_ = fallback(l, id)
    return r && !isNil(r) ?
      tsql`${l_} not in ${row(r)}` :
      tsql`${l_} is not null`
  }

export default notIn
