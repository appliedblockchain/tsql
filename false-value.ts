import type S from './sanitised'
import raw from './raw'

/**
 * Value boolean false – 0 casted as BIT.
 *
 * Logical booleans can be used in condition expressions, ie. WHERE clause.
 *
 * Value booleans can be used in assignment statements, ie. UPDATE SET clause.
 *
 * @see falseValue for value boolean variant.
 */
export const falseValue: S =
  raw('cast(0 as bit)')

export default falseValue
