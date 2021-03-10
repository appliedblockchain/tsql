import { inspect } from 'util'
import falseValue from './false-value'
import json from './json'
import nstring from './nstring'
import null_ from './null'
import number from './number'
import S from './sanitised'
import trueValue from './true-value'

/**
 * Sanitised values are returned as is.
 * `undefined` and `null` return sanitised `null`.
 * Finite numbers return sanitised, decimal numbers.
 * Booleans return sanitised `1` (true) or `0` (false).
 * Strings return sanitised unicode strings, ie. `N'foo'`.
 * Objects return json stringified, sanitised unicode strings, ie. `{foo:1}` returns `N'{"foo":1}'`.
 * Non finite numbers throw because mssql doesn't support them.
 * All other values throw.
 * @returns sanitised arbitrary value.
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
        return json(value)
      }
      default:
        throw new TypeError(`Unable to auto generate sql for ${inspect(value)}.`)
    }
  }

export default auto
