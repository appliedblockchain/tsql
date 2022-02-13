import fallback from './fallback.js'
import id from './identifier.js'
import type S from './sanitised.js'
import type Sid from './sanitised-identifier.js'
import tsql from './template.js'
import whereOf from './where.js'

/** @returns EXISTS query for table with WHERE clause. */
export const exists =
  (table: Sid | string, where: S | Record<string, unknown>): S => {
    const table_ = id(table)
    const where_ = fallback(where, whereOf)
    return tsql`exists (select top 1 1 from ${table_} where ${where_})`
  }

export default exists
