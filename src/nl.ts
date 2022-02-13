import op from './op.js'
import type S from './sanitised.js'

export const nl =
  (lhs: S | string, rhs: unknown): undefined | S =>
    op(lhs, '!<', rhs)

export default nl
