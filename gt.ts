import op from './op'
import type S from './sanitised'

/**
 * @returns greater than expression.
 *
 * `undefined` RHS is propagated.
 */
export const gt =
  (l: S | string, r: unknown): undefined | S =>
    op(l, '>', r)

export default gt
