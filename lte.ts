import op from './op'
import type S from './sanitised'

/**
 * @returns lower than or equal expression.
 *
 * `undefined` RHS is propagated.
 */
export const lte =
  (l: S | string, r: unknown): undefined | S =>
    op(l, '<=', r)

export default lte
