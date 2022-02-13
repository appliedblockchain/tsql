import type S from './sanitised.js'
import raw from './raw.js'

/**
 * Value boolean true – 1 casted as BIT.
 *
 * Logical booleans can be used in condition expressions, ie. WHERE clause.
 *
 * Value booleans can be used in assignment statements, ie. UPDATE SET clause.
 *
 * @see trueValue for value boolean variant.
 */
export const trueValue: S =
  raw('cast(1 as bit)')

export default trueValue
