import { inspect } from 'util'
import assignObject from './assign-object'
import fallback from './fallback'
import limitedHintsIdentifier from './limited-hints-identifier'
import logicalTrue from './logical-true'
import tsql from './template'
import type { TableHintLimited } from './table-hint-limited'
import type S from './sanitised'
import type Sid from './sanitised-identifier'
import whereOf from './where'

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
    if (!Object.keys(where).length) {
      throw new TypeError(`Expected where with keys, got ${inspect(where)}.`)
    }
    if (!Object.keys(object).length) {
      throw new TypeError(`Expected object with keys, got ${inspect(object)}.`)
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
