import * as TableHintLimited from './table-hint-limited'
import identifier from './identifier'
import list from './list'
import template from './template'
import type S from './sanitised'

/** @returns identifier with optional, limited hint(s). */
const limitedHintsIdentifier =
  (table: Parameters<typeof identifier>[0], hint?: TableHintLimited.t[]): S =>
    hint ?
      template`${identifier(table)} with (${list(hint, TableHintLimited.sanitized)})` :
      identifier(table)

export default limitedHintsIdentifier
