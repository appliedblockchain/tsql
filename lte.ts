import op from './op'
import S from './sanitised'

export const lte =
  (l: S | string, r: unknown): S =>
    op(l, '<=', r)

export default lte
