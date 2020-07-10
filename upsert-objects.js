// @flow

const { inspect } = require('util')
const { isArray } = Array
const and = require('./and')
const assign = require('./assign')
const eq = require('./eq')
const id = require('./identifier')
const inlineTableOfObjects = require('./inline-table-of-objects')
const keysOfObjects = require('./helpers/keys-of-objects')
const list = require('./list')
const row = require('./row')
const tsql = require('./template')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

const sourcePrefixed = _ => id([ 'Source', _ ])
const targetPrefixed = _ => id([ 'Target', _ ])

/** @returns merge dml that runs insert or update operations on target table from the result of a join with source table. */
const upsertObjects /*: (string | Sid, string[], $ReadOnlyArray<{ [string]: mixed }>, objectKeys?: string[], updateKeys?: string[], insertKeys?: string[]) => S */ =
  (table, onKeys, objects, maybeObjectKeys, maybeUpdateKeys, maybeInsertKeys) => {

    if (!isArray(objects)) {
      throw new TypeError(`Expected array of values, got ${inspect(objects)}.`)
    }

    if (!objects.length) {
      return tsql`select 0;`
    }

    const table_ = id(table)
    const objectKeys = maybeObjectKeys || keysOfObjects(objects)
    const updateKeys = maybeUpdateKeys || objectKeys
    const insertKeys = maybeInsertKeys || objectKeys
    const update_ = list(updateKeys.map(_ => assign(_, sourcePrefixed(_))))
    const on_ = and(...onKeys.map(_ => eq(sourcePrefixed(_), targetPrefixed(_))))

    return tsql`
      merge ${table_} as Target
      using ${inlineTableOfObjects('Source', objects, objectKeys)}
      on ${on_}
      when matched then
        update set ${update_}
      when not matched by target then
        insert ${row(insertKeys.map(id))}
        values ${row(insertKeys.map(sourcePrefixed))};
    `
  }

module.exports = upsertObjects
