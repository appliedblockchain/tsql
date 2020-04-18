// @flow

const { inspect } = require('util')
const { keys: keysOf } = Object
const auto = require('./auto')
const id = require('./identifier')
const list = require('./list')
const tsql = require('./template')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

/** @returns insert `object` into `table` statement. */
const insertObject /*: (string | Sid, $ReadOnly<{ [string]: mixed }>) => S */ =
  (table, object) => {
    const keys = keysOf(object)
    if (!keys.length) {
      throw new TypeError(`Expected object with keys, got ${inspect(object)}.`)
    }
    const table_ = id(table)
    const keys_ = list(keys.map(id))
    const values_ = list(keys.map(_ => object[_]).map(auto))
    return tsql`insert into ${table_} (${keys_}) values (${values_})`
  }

module.exports = insertObject
