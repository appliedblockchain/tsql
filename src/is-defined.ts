import { isObject } from './is-object.js'

export type Defined<T> =
  T extends undefined ?
    never :
    T

/** @returns true if values propagates to undefined, false otherwise. */
export function isDefined<T>(value: T): value is Defined<T> {
  if (typeof value === 'undefined') {
    return false
  }
  if (isObject(value)) {
    return Object
      .values(value)
      .some(_ => typeof _ !== 'undefined')
  }
  return true
}
