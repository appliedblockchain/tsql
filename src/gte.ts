import op from './op.js'
import type S from './sanitised.js'

/**
 * @returns greater than or equal expression.
 *
 * `undefined` RHS is propagated.
 */
export const gte =
  (l: S | string, r: unknown): undefined | S =>
    op(l, '>=', r)

export default gte
