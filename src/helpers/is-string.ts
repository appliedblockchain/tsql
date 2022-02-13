// TODO: Remove this, this is dangerous.
export const isString =
  (value: unknown): boolean =>
    typeof value === 'string' || value instanceof String

export default isString
