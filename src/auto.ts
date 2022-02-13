import { inspect } from 'util'
import falseValue from './false-value.js'
import json from './json.js'
import nstring from './nstring.js'
import null_ from './null.js'
import number from './number.js'
import raw from './raw.js'
import S from './sanitised.js'
import trueValue from './true-value.js'

/**
 * @returns automatically sanitised value.
 *
 * Already sanitised values are returned as is.
 *
 * `undefined` and `null` return sanitised `null`.
 *
 * Finite numbers return sanitised, decimal numbers.
 *
 * Booleans return sanitised `1` (true) or `0` (false).
 *
 * Strings return sanitised unicode strings, ie. `N'foo'`.
 *
 * Dates return ISO strings.
 *
 * Buffers return hex literals.
 *
 * Other objects return json-stringified, sanitised unicode strings, ie. `{foo:1}` returns `N'{"foo":1}'`.
 *
 * @throws {TypeError} for non-finite numbers (not supported by mssql).
 *
 * @throws {TypeError} for all other values.
 */
export const auto =
  (value: unknown): S => {
    if (value instanceof S) {
      return value
    }
    switch (typeof value) {
      case 'undefined': return null_
      case 'number': return number(value)
      case 'boolean': return value ? trueValue : falseValue
      case 'string': return nstring(value)
      case 'object': {
        if (value === null) {
          return null_
        }
        if (value instanceof Date) {
          return nstring(value.toISOString())
        }
        if (value instanceof Buffer) {
          return raw('0x' + value.toString('hex'))
        }
        return json(value)
      }
      default:
        throw new TypeError(`Unable to auto generate sql for ${inspect(value)}.`)
    }
  }

export default auto
