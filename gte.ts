import op from './op'
import S from './sanitised'

export const gte =
  (l: S | string, r: unknown): S =>
    op(l, '>=', r)

export default gte
