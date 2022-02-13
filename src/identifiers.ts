import id from './identifier.js'
import list from './list.js'
import type S from './sanitised.js'
import type Sid from './sanitised-identifier.js'

/**
 * @returns comma separated list of provided identifiers.
 *
 * @see identifier
 */
export const identifiers =
  (...xs: (Sid | string)[]): undefined | S =>
    list(xs.map(id))

export default identifiers
