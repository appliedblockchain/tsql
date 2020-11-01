import { inspect } from 'util'
import auto from './auto'
import raw from './raw'
import type S from './sanitised'

export const lines =
  <T>(xs: readonly T[], separator: string): S => {
    if (!Array.isArray(xs)) {
      throw new TypeError(`Expected array, got ${inspect(xs)}.`)
    }
    return raw(
      xs
        .filter(_ => typeof _ !== 'undefined')
        .map(_ => auto(_).toString().trim())
        .join(separator)
    )
  }

export default lines
