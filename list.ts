import { inspect } from 'util'
import auto from './auto'
import raw from './raw'
import S from './sanitised'

export const list =
  <T>(xs: T[], f: (_: T) => S = auto): S => {
    if (!Array.isArray(xs)) {
      throw new TypeError(`Expected array, got ${inspect(xs)}.`)
    }
    return raw(xs.map(_ => f(_).toString().trim()).join(', '))
  }

export default list
