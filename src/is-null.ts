import Sanitised from './sanitised.js'

/** @returns `true` if value is `null` or sanitised null, `false` otherwise. */
export const isNull =
  (value: unknown) =>
    value === null ||
    (value instanceof Sanitised && value.toString() === 'null')

export default isNull
