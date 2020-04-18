// @flow

const tsql = require('./template')
const whereOf = require('./where')
const fallback = require('./fallback')
const id = require('./identifier')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

const exists /*: (Sid | string, S | $ReadOnly<{ [string]: mixed }>) => S */ =
  (table, where) => {
    const table_ = id(table)
    const where_ = fallback(where, whereOf)
    return tsql`exists (select 1 from ${table_} where ${where_})`
  }

module.exports = exists
