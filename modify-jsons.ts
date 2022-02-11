import and from './and'
import eq from './eq'
import id from './identifier'
import inlineTableOfObjects from './inline-table-of-objects'
import keysOfObjects from './helpers/keys-of-objects'
import tsql from './template'
import type S from './sanitised'
import type Sid from './sanitised-identifier'
import list from './list'
import assign from './assign'

export type Where = Record<string, unknown>
export type Update = Record<string, Record<string, unknown>>

export const sourcePrefixed =
  (_: Sid | string): Sid =>
    id([ 'Source', _ ])

export const targetPrefixed =
  (_: Sid | string): Sid =>
    id([ 'Target', _ ])

export const modify =
  (column: string, jsonKeys: string[]): S =>
    assign(
      targetPrefixed(column),
      jsonKeys.reduce((_, jsonKey) => tsql`json_modify(${_}, ${`$.${jsonKey}`}, json_query(${sourcePrefixed(column)}, ${`$.${jsonKey}`}))`, targetPrefixed(column) as S)
    ) as S

/** @returns MERGE DML for json columns, multiple rows via JSON_MODIFY and JSON_QUERY. */
export const modifyJsons = (
  table: Sid | string,
  entries: readonly Record<string, unknown>[]
): S => {

  if (entries.length === 0) {
    return tsql`select 0;`
  }

  const table_ = id(table)
  const objectKeys = keysOfObjects(entries)
  const onKeys = objectKeys.filter(_ => !_.endsWith('Json'))
  const jsonColumns = objectKeys.filter(_ => _.endsWith('Json'))
  const update_ = list(jsonColumns.map(jsonColumn => {
    const jsonKeys = keysOfObjects(entries.map(_ => _[jsonColumn] as Record<string, unknown>))
    return modify(jsonColumn, jsonKeys)
  }))

  const on_ = and(...onKeys.map(_ => eq(sourcePrefixed(_), targetPrefixed(_))))

  return tsql`
    merge ${table_} as ${id('Target')}
    using ${inlineTableOfObjects('Source', entries, objectKeys)}
    on ${on_}
    when matched then
      update set ${update_};
  `
}

export default modifyJsons
