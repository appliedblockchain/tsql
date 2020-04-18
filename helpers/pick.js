// @flow

/** @returns an object with picked keys; `null` is used when value is not defined. */
const pick /*: (any, string[]) => { [string]: any } */ =
  (object, keys) => {
    const result = {}
    for (const key of keys) {
      result[key] = typeof object[key] === 'undefined' ?
        null :
        object[key]
    }
    return result
  }

module.exports = pick
