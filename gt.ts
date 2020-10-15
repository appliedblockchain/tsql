import op from './op'
import type S from './sanitised'

export const gt =
  (l: S | string, r: unknown): S =>
    op(l, '>', r)

export default gt
