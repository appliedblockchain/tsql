import assign from './assign'
import id from './identifier'
import list from './list'
import type S from './sanitised'

/**
 * @returns assigment clause based on provided record, ie. for UPDATE SET.
 *
 * `undefined` entries are filtered out.
 *
 * Propagates undefined if there are no non-undefined entries.
 */
export const assignObject =
  (record: Record<string, unknown>): undefined | S =>
    list(Object.keys(record).map(key => assign(id(key), record[key])))

export default assignObject
