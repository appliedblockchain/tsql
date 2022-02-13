export const isNil =
  (x: unknown): boolean => (
    x == null ||
    String(x) === 'null' ||
    String(x) === 'undefined'
  )

export default isNil
