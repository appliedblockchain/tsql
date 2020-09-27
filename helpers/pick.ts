
/** @returns an object with picked keys; `null` is used when value is not defined. */
export const pick =
  (object: Record<string, unknown>, keys: string[]): Record<string, unknown> => {
    const result: Record<string, unknown> = {}
    for (const key of keys) {
      result[key] = typeof object[key] === 'undefined' ?
        null :
        object[key]
    }
    return result
  }

export default pick
