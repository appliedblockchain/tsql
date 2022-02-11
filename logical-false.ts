import type S from './sanitised'
import raw from './raw'

/**
 * Simulated logical false – 0=1.
 *
 * Logical booleans can be used in condition expressions, ie. WHERE clause.
 *
 * Value booleans can be used in assignment statements, ie. UPDATE SET clause.
 *
 * @see falseValue for value boolean variant.
 */
export const logicalFalse: S =
  raw('0=1')

export default logicalFalse
