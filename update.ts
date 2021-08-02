import { inspect } from 'util'
import assignObject from './assign-object'
import fallback from './fallback'
import limitedHintsIdentifier from './limited-hints-identifier'
import tsql from './template'
import type { TableHintLimited } from './table-hint-limited'
import type S from './sanitised'
import type Sid from './sanitised-identifier'
import whereOf from './where'

export const update =
  (
    table: Sid | string,
    where: S | Record<string, unknown>,
    object: Record<string, unknown>,
    { hints }: {
      hints?: TableHintLimited[]
    } = {}
  ): S => {
    if (!Object.keys(where).length) {
      throw new TypeError(`Expected where with keys, got ${inspect(where)}.`)
    }
    if (!Object.keys(object).length) {
      throw new TypeError(`Expected object with keys, got ${inspect(object)}.`)
    }
    const table_ = limitedHintsIdentifier(table, hints)
    const where_ = fallback(where, whereOf)
    const object_ = assignObject(object)
    return tsql`
      update ${table_}
      set ${object_}
      where ${where_}
    `
  }

export default update
