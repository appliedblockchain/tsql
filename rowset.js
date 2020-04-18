// @flow

const { inspect } = require('util')
const row = require('./row')
const { isArray } = Array

/*:: import S from './sanitised' */

const rowset /*: <T>($ReadOnlyArray<$ReadOnlyArray<T>>) => S */ =
  xs => {
    if (!isArray(xs)) {
      throw new TypeError(`Expected array, got ${inspect(xs)}.`)
    }
    return row(xs, row)
  }

module.exports = rowset
