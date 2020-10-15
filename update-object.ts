import { inspect } from 'util'
import assignObject from './assign-object'
import fallback from './fallback'
import id from './identifier'
import type S from './sanitised'
import type Sid from './sanitised-identifier'
import tsql from './template'
import whereOf from './where'

export const updateObject =
  (table: Sid | string, where: S | Record<string, unknown>, object: Record<string, unknown>): S => {
    if (!Object.keys(where).length) {
      throw new TypeError(`Expected where with keys, got ${inspect(where)}.`)
    }
    if (!Object.keys(object).length) {
      throw new TypeError(`Expected object with keys, got ${inspect(object)}.`)
    }
    const table_ = id(table)
    const where_ = fallback(where, whereOf)
    const object_ = assignObject(object)
    return tsql`
      update ${table_}
      set ${object_}
      where ${where_}
    `
  }

export default updateObject
