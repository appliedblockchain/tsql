import * as TableHintLimited from './table-hint-limited.js'
import identifier from './identifier.js'
import list from './list.js'
import template from './template.js'
import type S from './sanitised.js'

/** @returns identifier with optional, [limited hints](https://docs.microsoft.com/en-us/sql/t-sql/queries/hints-transact-sql-table). */
const limitedHintsIdentifier =
  (table: Parameters<typeof identifier>[0], hints?: TableHintLimited.t[]): S =>
    hints && hints.length > 0 ?
      template`${identifier(table)} with (${list(hints, TableHintLimited.sanitized)})` :
      identifier(table)

export default limitedHintsIdentifier
