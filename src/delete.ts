import fallback from './fallback.js'
import id from './identifier.js'
import line from './line.js'
import type S from './sanitised.js'
import type Sid from './sanitised-identifier.js'
import tsql from './template.js'
import whereOf from './where.js'

/** @returns DELETE DML for table with optional WHERE clause. */
export const delete_ =
  (table: Sid | string, where?: S | Record<string, unknown>): S =>
    line(
      tsql`delete from ${id(table)}`,
      where ?
        tsql`where ${fallback(where, whereOf)}` :
        undefined
    )

export default delete_
