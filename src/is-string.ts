// TODO: Remove this, this is dangerous.
export const isString =

  // eslint-disable-next-line @typescript-eslint/ban-types
  (value: unknown): value is string | String =>
    typeof value === 'string' || value instanceof String

export default isString
