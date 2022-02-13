import op from './op.js'
import type S from './sanitised.js'

export const ng =
  (lhs: S | string, rhs: unknown): undefined | S =>
    op(lhs, '!>', rhs)

export default ng
