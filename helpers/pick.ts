
/** @returns an object with picked keys; `null` is used when value is not defined. */
export const pick =
  (object: { [key: string]: unknown }, keys: string[]): { [key: string]: unknown } => {
    const result: { [key: string]: unknown } = {}
    for (const key of keys) {
      result[key] = typeof object[key] === 'undefined' ?
        null :
        object[key]
    }
    return result
  }

export default pick
