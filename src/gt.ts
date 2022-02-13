import op from './op.js'
import type S from './sanitised.js'

/**
 * @returns greater than expression.
 *
 * `undefined` RHS is propagated.
 */
export const gt =
  (l: S | string, r: unknown): undefined | S =>
    op(l, '>', r)

export default gt
