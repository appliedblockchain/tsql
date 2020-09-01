import op from './op'
import S from './sanitised'

export const lte =
  (l: unknown, r: unknown): S =>
    op(l, '<=', r)

export default lte
