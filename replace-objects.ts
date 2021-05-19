import { inspect } from 'util'
import and from './and'
import assign from './assign'
import eq from './eq'
import id from './identifier'
import inlineTableOfObjects from './inline-table-of-objects'
import keysOfObjects from './helpers/keys-of-objects'
import list from './list'
import maybeWith from './maybe-with'
import row from './row'
import tsql from './template'
import type S from './sanitised'
import type Sid from './sanitised-identifier'

const sourcePrefixed = (_: string): Sid => id([ 'Source', _ ])
const targetPrefixed = (_: string): Sid => id([ 'Target', _ ])

/** @returns merge dml that replaces target table with inlined source table. */
export const replaceObjects =
  (
    table: string | Sid,
    onKeys: string[],
    objects: readonly Record<string, unknown>[],
    maybeObjectKeys?: string[],
    maybeUpdateKeys?: string[],
    maybeInsertKeys?: string[],
    hints?: string[]
  ): S => {

    if (!Array.isArray(objects)) {
      throw new TypeError(`Expected array of values, got ${inspect(objects)}.`)
    }

    const table_ = id(table)

    if (objects.length === 0) {
      return tsql`delete from ${table_};`
    }

    const objectKeys = maybeObjectKeys || keysOfObjects(objects)
    const updateKeys = maybeUpdateKeys || objectKeys
    const insertKeys = maybeInsertKeys || objectKeys
    const update_ = list(updateKeys.map(_ => assign(_, sourcePrefixed(_))))
    const on_ = and(...onKeys.map(_ => eq(sourcePrefixed(_), targetPrefixed(_))))

    return tsql`
      merge ${maybeWith(table_, hints)} as Target
      using ${inlineTableOfObjects('Source', objects, objectKeys)}
      on ${on_}
      when not matched by source then
        delete
      when matched then
        update set ${update_}
      when not matched by target then
        insert ${row(insertKeys.map(id))}
        values ${row(insertKeys.map(sourcePrefixed))};
    `
  }

export default replaceObjects
