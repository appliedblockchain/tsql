import op from './op'
import S from './sanitised'

export const nl =
  (l: unknown, r: unknown): S =>
    op(l, '!<', r)

export default nl