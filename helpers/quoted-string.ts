import { inspect } from 'util'
import isString from './is-string'

export const quotedString =
  (value: string): string => {
    if (!isString(value)) {
      throw new TypeError(`Expected string while trying to quote, got ${inspect(value)}.`)
    }
    return '\'' + value.replace(/'/g, '\'\'') + '\''
  }

export default quotedString
