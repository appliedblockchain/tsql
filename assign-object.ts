import assign from './assign'
import id from './identifier'
import list from './list'
import type S from './sanitised'

/**
 * @returns assigment clause based on provided record, ie. for UPDATE SET.
 *
 * `undefined` entries are filtered out.
 *
 * @throws {Error} if provided record doesn't have any non-`undefined` entries.
 */
export const assignObject =
  (record: Record<string, unknown>): S => {
    const keys = Object.keys(record).filter(k => typeof k !== 'undefined')
    if (keys.length === 0) {
      throw new Error('Expected record with at least one key.')
    }
    return list(keys.map(k => assign(id(k), record[k])))
  }

export default assignObject
