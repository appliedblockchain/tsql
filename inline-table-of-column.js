// @flow

const { inspect } = require('util')
const id = require('./identifier')
const list = require('./list')
const row = require('./row')
const tsql = require('./template')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

/** @returns literal table from provided values.
    @throws if `values` array is empty. */
const inlineTableOfColumn /*: (string | Sid, string | Sid, $ReadOnlyArray<mixed>) => S */ =
  (table, column, values) => {
    if (!values.length) {
      throw new Error(`Can't generate ${inspect(table)} literal table of ${inspect(column)} column with an empty array of values.`)
    }
    const table_ = id(table)
    const column_ = id(column)
    const values_ = list(values.map(_ => row([ _ ])))
    return tsql`(values ${values_}) as ${table_} (${column_})`
  }

module.exports = inlineTableOfColumn
