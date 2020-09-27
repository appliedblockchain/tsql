import { inspect } from 'util'
import row from './row'
import S from './sanitised'

export const rowset =
  <T>(xs: T[]): S => {
    if (!Array.isArray(xs)) {
      throw new TypeError(`Expected array, got ${inspect(xs)}.`)
    }
    return row<any>(xs, row)
  }

export default rowset
