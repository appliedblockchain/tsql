import { inspect } from 'util'
import and from './and.js'
import eq from './eq.js'
import id from './identifier.js'
import inlineTableOfObjects from './inline-table-of-objects.js'
import keysOfObjects from './keys-of-objects.js'
import limitedHintsIdentifier from './limited-hints-identifier.js'
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
 * @returns merge DML that runs insert operations on target table from the result of a join with source table.
 *
 * Already existing records are skipped.
 *
 * This DML is using MERGE statement.
 *
 * @see insertIgnore for DML based on INSERT and LEFT JOIN.
 */
export const insertNotMatched =
  (
    table: Sid | string,
    onKeys: string[],
    objects: Record<string, unknown>[],
    maybeObjectKeys?: string[],
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
    const on_ = and(...onKeys.map(_ => eq(sourcePrefixed(_), targetPrefixed(_))))

    return tsql`
      merge ${table_} as ${id('Target')}
      using ${inlineTableOfObjects('Source', objects, objectKeys)}
      on ${on_}
      when not matched by target then
        insert ${row(objectKeys.map(id))}
        values ${row(objectKeys.map(sourcePrefixed))};
    `
  }

export default insertNotMatched
