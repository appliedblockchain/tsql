// @flow

const { inspect } = require('util')
const { keys: keysOf } = Object
const assignObject = require('./assign-object')
const fallback = require('./fallback')
const id = require('./identifier')
const tsql = require('./template')
const whereOf = require('./where')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

const updateObject /*: (Sid | string, S | $ReadOnly<{ [string]: mixed }>, $ReadOnly<{ [string]: mixed }>) => S */ =
  (table, where, object) => {
    if (!keysOf(where).length) {
      throw new TypeError(`Expected where with keys, got ${inspect(where)}.`)
    }
    if (!keysOf(object).length) {
      throw new TypeError(`Expected object with keys, got ${inspect(object)}.`)
    }
    const table_ = id(table)
    const where_ = fallback(where, whereOf)
    const object_ = assignObject(object)
    return tsql`
      update ${table_}
      set ${object_}
      where ${where_}
    `
  }

module.exports = updateObject
