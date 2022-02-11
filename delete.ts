import fallback from './fallback'
import id from './identifier'
import line from './line'
import type S from './sanitised'
import type Sid from './sanitised-identifier'
import tsql from './template'
import whereOf from './where'

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
