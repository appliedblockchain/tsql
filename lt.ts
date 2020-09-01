import op from './op'
import S from './sanitised'

export const lt =
  (l: unknown, r: unknown): S =>
    op(l, '<', r)

export default lt
