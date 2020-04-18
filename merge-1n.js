// @flow

const { inspect } = require('util')
const { isArray } = Array
const id = require('./identifier')
const inlineTable = require('./inline-table-of-column')
const row = require('./row')
const tsql = require('./template')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

const merge1n /*: (string | Sid, [Sid | string, Sid | string], mixed, $ReadOnlyArray<mixed>) => S */ =
  (table, [ lcolumn, rcolumn ], lid, values) => {
    const table_ = id(table)
    const lcolumn_ = id(lcolumn)
    const rcolumn_ = id(rcolumn)
    if (!isArray(values)) {
      throw new TypeError(`Expected array of values, got ${inspect(values)}.`)
    }
    if (!values.length) {
      return tsql`delete from ${table_} where ${lcolumn_} = ${lid};`
    }
    return tsql`
      merge ${table_} as Target
      using ${inlineTable('Source', 'id', values)}
      on (
        Target.${lcolumn_} = ${lid} and
        Target.${rcolumn_} = Source.id
      )
      when not matched by target then
        insert ${row([ lcolumn_, rcolumn_ ])}
        values ${row([ lid, id('Source.id') ])}
      when not matched by source and Target.${lcolumn_} = ${lid} then
        delete;
    `
  }

module.exports = merge1n
