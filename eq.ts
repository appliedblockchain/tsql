import fallback from './fallback'
import id from './identifier'
import isNil from './helpers/is-nil'
import S from './sanitised'
import Sid from './sanitised-identifier'
import tsql from './template'

export const eq =
  (l: Sid | string, r: unknown): S => {
    const l_ = fallback(l, id)
    return isNil(r) ?
      tsql`${l_} is null` :
      tsql`${l_} = ${r}`
  }

export default eq
