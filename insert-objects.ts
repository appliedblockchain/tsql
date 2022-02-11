import { inspect } from 'util'
import auto from './auto'
import id from './identifier'
import keysOfObjects from './helpers/keys-of-objects'
import list from './list'
import row from './row'
import tsql from './template'
import type S from './sanitised'
import type Sid from './sanitised-identifier'

/**
 * @returns multiple row insert DML.
 *
 * @see insertIgnore for DML which ignores existing rows.
 *
 * @see insertNotMatched for DML which ignores existing rows using MERGE statement.
 */
export const insertObjects =
  (
    table: Sid | string,
    objects: Record<string, unknown>[],
    maybeKeys?: string[]
  ): S => {

    if (!Array.isArray(objects)) {
      throw new TypeError(`Expected array of values, got ${inspect(objects)}.`)
    }

    if (!objects.length) {
      return tsql`select 0;`
    }

    const table_ = id(table)
    const keys = maybeKeys ?? keysOfObjects(objects)
    const keys_ = list(keys.map(id))
    const values_ = list(objects.map(object => row(keys.map(key => auto(object[key])))))
    return tsql`
      insert into ${table_} (${keys_})
      values ${values_}
    `
  }

export default insertObjects
