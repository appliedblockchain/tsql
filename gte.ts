import op from './op'
import S from './sanitised'

export const gte =
  (l: unknown, r: unknown): S =>
    op(l, '>=', r)

export default gte
