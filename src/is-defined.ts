export type Defined<T> =
  T extends undefined ?
    never :
    T

/** @returns true if values propagates to undefined, false otherwise. */
const isDefined =
  <T>(value: T): value is Defined<T> => {
    if (typeof value === 'undefined') {
      return false
    }
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return Object.values(value).some(isDefined)
    }
    return true
  }

export default isDefined
