// @flow

const auto = require('./auto')
const id = require('./identifier')
const keysOfObjects = require('./helpers/keys-of-objects')
const list = require('./list')
const row = require('./row')
const tsql = require('./template')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

const inlineTableOfObjects /*: (string | Sid, $ReadOnlyArray<{| +[string]: mixed |}>, maybeKeys?: string[]) => S */ =
  (table, objects, maybeKeys) => {
    const table_ = id(table)
    const keys = maybeKeys || keysOfObjects(objects)
    const columns_ = row(keys.map(id))
    const values_ = list(objects.map(object => row(keys.map(key => auto(object[key])))))
    return tsql`(values ${values_}) as ${table_} ${columns_}`
  }

module.exports = inlineTableOfObjects
