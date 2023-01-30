import auto from './auto.js'
import defined from './defined.js'
import id from './identifier.js'
import list from './list.js'
import tsql from './template.js'
import type S from './sanitised.js'
import type Sid from './sanitised-identifier.js'

/**
 * @returns insert DML for single row.
 *
 * `undefined` entries are filtered out.
 *
 * @throws {TypeError} if there are no non-`undefined` entries.
 */
export const insertObject =
  (table: Sid | string, object: Record<string, unknown>, output?: S): S => {
    const object_ = defined(object)
    const keys = Object.keys(object_)
    if (!keys.length) {
      throw new TypeError(`Expected object with keys, got ${object_}.`)
    }
    const table_ = id(table)
    const keys_ = list(keys.map(id))
    const values_ = list(keys.map(_ => object_[_]).map(auto))
    return output ?
      tsql`insert into ${table_} (${keys_}) output ${output} values (${values_})` :
      tsql`insert into ${table_} (${keys_}) values (${values_})`
  }

export default insertObject
