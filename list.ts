import { inspect } from 'util'
import auto from './auto'
import raw from './raw'
import type S from './sanitised'

/**
 * @returns comma separated list of values.
 *
 * Optional element to sanitised string mapping can be provided (defaults to auto-sanitation).
 */
export const list =
  <T>(xs: readonly T[], f: (_: T) => S = auto): S => {
    if (!Array.isArray(xs)) {
      throw new TypeError(`Expected array, got ${inspect(xs)}.`)
    }
    return raw(xs.filter(_ => typeof _ !== 'undefined').map(_ => f(_).toString().trim()).join(', '))
  }

export default list
