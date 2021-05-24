import { inspect } from 'util'
import and from './and'
import eq from './eq'
import id from './identifier'
import inlineTableOfObjects from './inline-table-of-objects'
import keysOfObjects from './helpers/keys-of-objects'
import maybeWith from './maybe-with'
import row from './row'
import tsql from './template'
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
    hints?: string[]
  ): S => {

    if (!Array.isArray(objects)) {
      throw new TypeError(`Expected array of values, got ${inspect(objects)}.`)
    }

    if (!objects.length) {
      return tsql`select 0;`
    }

    const table_ = id(table)
    const objectKeys = maybeObjectKeys || keysOfObjects(objects)
    const on_ = and(...onKeys.map(_ => eq(sourcePrefixed(_), targetPrefixed(_))))

    return tsql`
      merge ${maybeWith(table_, hints)} as ${id('Target')}
      using ${inlineTableOfObjects('Source', objects, objectKeys)}
      on ${on_}
      when not matched by target then
        insert ${row(objectKeys.map(id))}
        values ${row(objectKeys.map(sourcePrefixed))};
    `
  }

export default insertObjects
