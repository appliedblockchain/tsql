import op from './op'
import S from './sanitised'

export const lt =
  (l: S | string, r: unknown): S =>
    op(l, '<', r)

export default lt
