import op from './op'
import S from './sanitised'

export const ng =
  (l: S | string, r: unknown): S =>
    op(l, '!>', r)

export default ng
