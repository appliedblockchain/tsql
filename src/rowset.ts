import row from './row.js'
import type S from './sanitised.js'

export const rowset =
  <T>(values: T[][]): S => {
    if (!Array.isArray(values)) {
      throw new TypeError(`Expected array, got ${values}.`)
    }
    return row(values, row)
  }

export default rowset
