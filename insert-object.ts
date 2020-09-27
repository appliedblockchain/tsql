import { inspect } from 'util'
import auto from './auto'
import id from './identifier'
import list from './list'
import S from './sanitised'
import Sid from './sanitised-identifier'
import tsql from './template'

/** @returns insert `object` into `table` statement. */
export const insertObject =
  (table: Sid | string, object: Record<string, unknown>): S => {
    const keys = Object.keys(object)
    if (!keys.length) {
      throw new TypeError(`Expected object with keys, got ${inspect(object)}.`)
    }
    const table_ = id(table)
    const keys_ = list(keys.map(id))
    const values_ = list(keys.map(_ => object[_]).map(auto))
    return tsql`insert into ${table_} (${keys_}) values (${values_})`
  }

export default insertObject
