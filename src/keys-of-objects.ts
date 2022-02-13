/** @returns `true` if boths string arrays are the same. */
export const same =
  (xs: string[], ys: string[]): boolean =>
    xs.length === ys.length && xs.every((x, i) => x === ys[i])

/**
 * @returns keys of all objects in array
 * @throws if objects have different keys.
 * @throws if an array is empty.
 */
export const keysOfObjects =
  (objects: readonly Record<string, unknown>[]): string[] => {
    if (!Array.isArray(objects)) {
      throw new TypeError(`Expected array, got ${objects}.`)
    }
    if (!objects.length) {
      throw new TypeError('Expected non empty array.')
    }
    const keys = Object.keys(objects[0]).sort()
    for (let i = 1; i < objects.length; i++) {
      const keys_ = Object.keys(objects[i]).sort()
      if (!same(keys, keys_)) {
        throw new TypeError(`Expected same keys on all objects, got ${keys} and ${keys_} at ${i} index.`)
      }
    }

    // Return naturally ordered keys.
    return Object.keys(objects[0])
  }

export default keysOfObjects
