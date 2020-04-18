// @flow

const { keys: keysOf } = Object
const assign = require('./assign')
const id = require('./identifier')
const list = require('./list')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

/** @returns assigment based on object key-values. */
const assignObject /*: $ReadOnly<{ [string]: mixed }> => S */ =
  kv =>
    list(keysOf(kv).map(k => assign(id(k), kv[k])))

module.exports = assignObject
