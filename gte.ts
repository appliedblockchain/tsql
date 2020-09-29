import op from './op'
import type S from './sanitised'

export const gte =
  (l: S | string, r: unknown): S =>
    op(l, '>=', r)

export default gte
