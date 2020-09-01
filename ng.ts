import op from './op'
import S from './sanitised'

export const ng =
  (l: unknown, r: unknown): S =>
    op(l, '!>', r)

export default ng
