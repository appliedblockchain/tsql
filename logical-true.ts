import type S from './sanitised'
import raw from './raw'

/**
 * Simulated logical true – 1=1.
 *
 * Logical booleans can be used in condition expressions, ie. WHERE clause.
 *
 * Value booleans can be used in assignment statements, ie. UPDATE SET clause.
 *
 * @see trueValue for value boolean variant.
 */
export const logicalTrue: S =
  raw('1=1')

export default logicalTrue
