import { inspect } from 'util'
import and from './and.js'
import assign from './assign.js'
import eq from './eq.js'
import id from './identifier.js'
import inlineTableOfObjects from './inline-table-of-objects.js'
import keysOfObjects from './keys-of-objects.js'
import limitedHintsIdentifier from './limited-hints-identifier.js'
import list from './list.js'
import row from './row.js'
import tsql from './template.js'
import type { TableHintLimited } from './table-hint-limited.js'
import type S from './sanitised.js'
import type Sid from './sanitised-identifier.js'

export const sourcePrefixed =
  (_: Sid | string): Sid =>
    id([ 'Source', _ ])

export const targetPrefixed =
  (_: Sid | string): Sid =>
    id([ 'Target', _ ])

/**
 * @returns MERGE DML.
 *
 * Updates existing rows.
 *
 * Inserts unmatched rows.
 */
export const upsertObjects =
  (
    table: Sid | string,
    onKeys: string[],
    objects: Record<string, unknown>[],
    maybeObjectKeys?: string[],
    maybeUpdateKeys?: string[],
    maybeInsertKeys?: string[],
    { hints = [ 'serializable' ] }: {
      hints?: TableHintLimited[]
    } = {}
  ): S => {

    if (!Array.isArray(objects)) {
      throw new TypeError(`Expected array of values, got ${inspect(objects)}.`)
    }

    if (!objects.length) {
      return tsql`select 0;`
    }

    const table_ = limitedHintsIdentifier(table, hints)
    const objectKeys = maybeObjectKeys || keysOfObjects(objects)
    const updateKeys = maybeUpdateKeys || objectKeys
    const insertKeys = maybeInsertKeys || objectKeys
    const update_ = list(updateKeys.map(_ => assign(_, sourcePrefixed(_))))
    const on_ = and(...onKeys.map(_ => eq(sourcePrefixed(_), targetPrefixed(_))))

    return tsql`
      merge ${table_} as Target
      using ${inlineTableOfObjects('Source', objects, objectKeys)}
      on ${on_}
      when matched then
        update set ${update_}
      when not matched by target then
        insert ${row(insertKeys.map(id))}
        values ${row(insertKeys.map(sourcePrefixed))};
    `
  }

export default upsertObjects
