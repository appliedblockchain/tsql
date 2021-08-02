import { inspect } from 'util'
import and from './and'
import eq from './eq'
import id from './identifier'
import inlineTableOfObjects from './inline-table-of-objects'
import keysOfObjects from './helpers/keys-of-objects'
import limitedHintsIdentifier from './limited-hints-identifier'
import row from './row'
import tsql from './template'
import type { TableHintLimited } from './table-hint-limited'
import type S from './sanitised'
import type Sid from './sanitised-identifier'

export const sourcePrefixed =
  (_: Sid | string): Sid =>
    id([ 'Source', _ ])

export const targetPrefixed =
  (_: Sid | string): Sid =>
    id([ 'Target', _ ])

/** @returns merge dml that runs insert operations on target table from the result of a join with source table. Already existing records are skipped. */
export const insertObjects =
  (
    table: Sid | string,
    onKeys: string[],
    objects: Record<string, unknown>[],
    maybeObjectKeys?: string[],
    { hints }: {
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

export default insertObjects
