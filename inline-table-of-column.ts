import { inspect } from 'util'
import id from './identifier'
import list from './list'
import row from './row'
import type S from './sanitised'
import type Sid from './sanitised-identifier'
import tsql from './template'

/**
 * @returns single column literal table from provided array of values.
 *
 * @throws {Error} if provided values array is empty.
 */
export const inlineTableOfColumn =
  (table: Sid | string, column: Sid | string, values: unknown[]): S => {
    if (!values.length) {
      throw new Error(`Can't generate ${inspect(table)} literal table of ${inspect(column)} column with an empty array of values.`)
    }
    const table_ = id(table)
    const column_ = id(column)
    const values_ = list(values.map(_ => row([ _ ])))
    return tsql`(values ${values_}) as ${table_} (${column_})`
  }

export default inlineTableOfColumn
