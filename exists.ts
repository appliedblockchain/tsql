import fallback from './fallback'
import id from './identifier'
import type S from './sanitised'
import type Sid from './sanitised-identifier'
import tsql from './template'
import whereOf from './where'

/** @returns EXISTS query for table with WHERE clause. */
export const exists =
  (table: Sid | string, where: S | Record<string, unknown>): S => {
    const table_ = id(table)
    const where_ = fallback(where, whereOf)
    return tsql`exists (select top 1 1 from ${table_} where ${where_})`
  }

export default exists
