import id from './identifier'
import list from './list'
import type S from './sanitised'
import type Sid from './sanitised-identifier'

export const identifiers =
  (...xs: (Sid | string)[]): S =>
    list(xs.map(id))

export default identifiers
