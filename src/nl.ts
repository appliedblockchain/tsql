import op from './op.js'
import type S from './sanitised.js'

export const nl =
  (l: S | string, r: unknown): undefined | S =>
    op(l, '!<', r)

export default nl
