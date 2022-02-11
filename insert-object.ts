import { inspect } from 'util'
import auto from './auto'
import defined from './defined'
import id from './identifier'
import list from './list'
import tsql from './template'
import type S from './sanitised'
import type Sid from './sanitised-identifier'

/**
 * @returns insert DML for single row.
 *
 * `undefined` entries are filtered out.
 *
 * @throws {TypeError} if there are no non-`undefined` entries.
 */
export const insertObject =
  (table: Sid | string, object: Record<string, unknown>): S => {
    const object_ = defined(object)
    const keys = Object.keys(object_)
    if (!keys.length) {
      throw new TypeError(`Expected object with keys, got ${inspect(object_)}.`)
    }
    const table_ = id(table)
    const keys_ = list(keys.map(id))
    const values_ = list(keys.map(_ => object_[_]).map(auto))
    return tsql`insert into ${table_} (${keys_}) values (${values_})`
  }

export default insertObject
