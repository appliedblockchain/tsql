import assign from './assign.js'
import id from './identifier.js'
import list from './list.js'
import type S from './sanitised.js'

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
