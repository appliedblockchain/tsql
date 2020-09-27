import id from './identifier'
import list from './list'
import S from './sanitised'
import Sid from './sanitised-identifier'

export const identifiers =
  (...xs: (Sid | string)[]): S =>
    list(xs.map(id))

export default identifiers
