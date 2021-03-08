import { inspect } from 'util'
import and from './and'
import eq from './eq'
import id from './identifier'
import inlineTableOfObjects from './inline-table-of-objects'
import keysOfObjects from './helpers/keys-of-objects'
import maybeWith from './maybe-with'
import tsql from './template'
import type S from './sanitised'
import type Sid from './sanitised-identifier'

export const sourcePrefixed =
  (_: Sid | string): Sid =>
    id([ 'Source', _ ])

export const targetPrefixed =
  (_: Sid | string): Sid =>
    id([ 'Target', _ ])

export const modify =
  (keys: string[], column: Sid | string): S =>
    keys.reduce((_, key) => tsql`json_modify(${_}, ${`$.${key}`}, json_query(Source.${id(key)}))`, id(column) as S)

/** @returns modifies json column for multiple rows. */
export const modifyJsons =
  (
    table: Sid | string,
    column: Sid | string,
    onKeys: string[],
    objects: Record<string, unknown>[],
    maybeObjectKeys?: string[],
    maybeUpdateKeys?: string[],
    hints?: string[]
  ): S => {

    if (!Array.isArray(objects)) {
      throw new TypeError(`Expected array of values, got ${inspect(objects)}.`)
    }

    if (!objects.length) {
      return tsql`select 0;`
    }

    const table_ = id(table)
    const column_ = id(column)
    const objectKeys = maybeObjectKeys || keysOfObjects(objects)
    const updateKeys = maybeUpdateKeys || objectKeys.filter(_ => !onKeys.includes(_))
    const update_ = modify(updateKeys, column_)
    const on_ = and(...onKeys.map(_ => eq(sourcePrefixed(_), targetPrefixed(_))))

    return tsql`
      merge ${maybeWith(table_, hints)} as Target
      using ${inlineTableOfObjects('Source', objects, objectKeys)}
      on ${on_}
      when matched then
        update set ${column_} = ${update_};
    `
  }

export default modifyJsons
