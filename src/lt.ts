import op from './op.js'
import type S from './sanitised.js'

/**
 * @returns lower than expression.
 *
 * `undefined` RHS is propagated.
 */
export const lt =
  (l: S | string, r: unknown): undefined | S =>
    op(l, '<', r)

export default lt
