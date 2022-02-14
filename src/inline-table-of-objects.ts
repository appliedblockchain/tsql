import auto from './auto.js'
import id from './identifier.js'
import keysOfObjects from './keys-of-objects.js'
import list from './list.js'
import row from './row.js'
import type S from './sanitised.js'
import type Sid from './sanitised-identifier.js'
import tsql from './template.js'

/**
 * @returns literal table from provided array of records.
 *
 * @throws {Error} if provided values array is empty.
 */
export const inlineTableOfObjects =
  (table: Sid | string, objects: readonly Record<string, unknown>[], maybeKeys?: string[]): S => {
    const table_ = id(table)
    const keys = maybeKeys || keysOfObjects(objects)
    const columns_ = row(keys.map(id))
    const values_ = list(objects.map(object => row(keys.map(key => auto(object[key])))), undefined, ',\n')
    return tsql`
      (values
        ${values_}
      ) as ${table_} ${columns_}`
  }

export default inlineTableOfObjects
