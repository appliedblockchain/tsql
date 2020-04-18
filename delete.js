// @flow

const tsql = require('./template')
const line = require('./line')
const fallback = require('./fallback')
const where = require('./where')
const id = require('./identifier')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

const delete_ /*: (Sid | string, void | S | $ReadOnly<{ [string]: mixed }>) => S */ =
  (table, where_) =>
    line(
      tsql`delete from ${id(table)}`,
      where ?
        tsql`where ${fallback(where_, where)}` :
        undefined
    )

module.exports = delete_
