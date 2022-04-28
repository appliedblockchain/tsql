import assignObject from './assign-object.js'
import fallback from './fallback.js'
import limitedHintsIdentifier from './limited-hints-identifier.js'
import logicalTrue from './logical-true.js'
import tsql from './template.js'
import type { TableHintLimited } from './table-hint-limited.js'
import type S from './sanitised.js'
import type Sid from './sanitised-identifier.js'
import whereOf from './where.js'

/** @returns UPDATE DML. */
export const update =
  (
    table: Sid | string,
    where: S | Record<string, unknown>,
    object: Record<string, unknown>,
    { hints = [ 'repeatableread' ] }: {
      hints?: TableHintLimited[]
    } = {}
  ): undefined | S => {
    if (Object.keys(object).length === 0) {
      return
    }
    const table_ = limitedHintsIdentifier(table, hints)
    const where_ = fallback(where, whereOf) ?? logicalTrue
    const object_ = assignObject(object)
    if (typeof object_ === 'undefined') {
      return
    }
    return tsql`
      update ${table_}
      set ${object_}
      where ${where_}
    `
  }

export default update
