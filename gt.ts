import op from './op'
import type S from './sanitised'

export const gt =
  (l: S | string, r: unknown): undefined | S =>
    op(l, '>', r)

export default gt
