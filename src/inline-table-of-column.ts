import id from './identifier.js'
import list from './list.js'
import row from './row.js'
import type S from './sanitised.js'
import type Sid from './sanitised-identifier.js'
import tsql from './template.js'

/**
 * @returns single column literal table from provided array of values.
 *
 * @throws {Error} if provided values array is empty.
 */
export const inlineTableOfColumn =
  (table: Sid | string, column: Sid | string, values: unknown[]): S => {
    if (values.length === 0) {
      throw new Error(`Can't generate literal table ${table} using column ${column} with an empty array of values.`)
    }
    const table_ = id(table)
    const column_ = id(column)
    const values_ = list(values.map(_ => row([ _ ])), undefined, ',\n')
    return tsql`
      (values
        ${values_}
      ) as ${table_} (${column_})
    `
  }

export default inlineTableOfColumn
