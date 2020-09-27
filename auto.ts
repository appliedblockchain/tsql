import { inspect } from 'util'
import S from './sanitised'
import null_ from './null'
import nstring from './nstring'
import json from './json'
import number from './number'
import raw from './raw'

export const auto =
  (value: unknown): S => {
    if (value instanceof S) {
      return value
    }
    switch (typeof value) {
      case 'undefined': return null_
      case 'number': return number(value)
      case 'boolean': return raw(value ? '1' : '0')
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
