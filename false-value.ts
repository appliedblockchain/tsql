import type S from './sanitised'
import raw from './raw'

/**
 * False value as 0 casted to BIT.
 *
 * False value can be used as assignment RHS.
 *
 * @see logicalFalse for logical false which can be used in condition ie. WHERE clause.
 */
export const falseValue: S =
  raw('cast(0 as bit)')

export default falseValue
