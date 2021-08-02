import { inspect } from 'util'
import and from './and'
import assign from './assign'
import eq from './eq'
import id from './identifier'
import inlineTableOfObjects from './inline-table-of-objects'
import keysOfObjects from './helpers/keys-of-objects'
import limitedHintsIdentifier from './limited-hints-identifier'
import list from './list'
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

/** @returns update dml that runs update operations on target table from the result of a join with source table. */
export const updateObjects =
  (
    table: Sid | string,
    onKeys: string[],
    objects: Record<string, unknown>[],
    maybeObjectKeys?: string[],
    maybeUpdateKeys?: string[],
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
    const updateKeys = maybeUpdateKeys || objectKeys
    const update_ = list(updateKeys.map(_ => assign(_, sourcePrefixed(_))))
    const on_ = and(...onKeys.map(_ => eq(sourcePrefixed(_), targetPrefixed(_))))

    return tsql`
      merge ${table_} as Target
      using ${inlineTableOfObjects('Source', objects, objectKeys)}
      on ${on_}
      when matched then
        update set ${update_};
    `
  }

export default updateObjects
