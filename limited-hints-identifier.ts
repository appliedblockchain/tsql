import * as TableHintLimited from './table-hint-limited'
import identifier from './identifier'
import list from './list'
import template from './template'
import type S from './sanitised'

/** @returns identifier with optional, limited hint(s). */
const limitedHintsIdentifier =
  (table: Parameters<typeof identifier>[0], hints?: TableHintLimited.t[]): S =>
    hints && hints.length > 0 ?
      template`${identifier(table)} with (${list(hints, TableHintLimited.sanitized)})` :
      identifier(table)

export default limitedHintsIdentifier
