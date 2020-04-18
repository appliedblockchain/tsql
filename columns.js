// @flow

const { keys: keysOf } = Object
const id = require('./identifier')
const list = require('./list')
const fallback = require('./fallback')

/*::

import S from './sanitised'

export type Columns = $ReadOnly<{ [string]: S | true }>

*/

const columns /*: (Columns, filter?: $ReadOnly<{ [string]: boolean }>) => S */ =
  (all, filter = {}) => {
    const xs = []
    for (const k of keysOf(all)) {
      if (filter[k] !== false) {
        xs.push(all[k] === true ? k : all[k])
      }
    }
    return list(xs.map(_ => fallback(_, id)))
  }

module.exports = columns
