import raw from './raw.js'
import type S from './sanitised.js'

export const number =
  (x: number): S => {
    if (!Number.isFinite(x)) {
      throw new TypeError(`Expected finite number, got ${x}.`)
    }
    return raw(x.toString(10))
  }

export default number
