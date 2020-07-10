// @flow

const { inspect } = require('util')
const { isArray } = Array
const { keys: keysOf } = Object

/** @returns `true` if boths string arrays are the same. */
const same /*: (string[], string[]) => boolean */ =
  (xs, ys) =>
    xs.length === ys.length && xs.every((x, i) => x === ys[i])

/** @returns keys of all objects in array
    @throws if objects have different keys.
    @throws if an array is empty. */
const keysOfObjects /*: $ReadOnlyArray<{...}> => string[] */ =
  objects => {
    if (!isArray(objects)) {
      throw new TypeError(`Expected array, got ${inspect(objects)}.`)
    }
    if (!objects.length) {
      throw new TypeError('Expected non empty array.')
    }
    const keys = keysOf(objects[0]).sort()
    for (let i = 1; i < objects.length; i++) {
      const keys_ = keysOf(objects[i]).sort()
      if (!same(keys, keys_)) {
        throw new TypeError(`Expected same keys on all objects, got ${inspect(keys)} and ${inspect(keys_)} at ${i} index.`)
      }
    }

    // Return naturally ordered keys.
    return keysOf(objects[0])
  }

module.exports = keysOfObjects
