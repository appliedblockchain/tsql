import { inspect } from 'util'
import raw from './raw'
import S from './sanitised'

export const number =
  (x: number): S => {
    if (!Number.isFinite(x)) {
      throw new TypeError(`Expected finite number, got ${inspect(x)}.`)
    }
    return raw(x.toString(10))
  }

export default number
