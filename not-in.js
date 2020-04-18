// @flow

const id = require('./identifier')
const tsql = require('./template')
const fallback = require('./fallback')
const isNil = require('./helpers/is-nil')
const row = require('./row')

/*:: import S from './sanitised' */

const notIn /*: (S | string, ?$ReadOnlyArray<mixed>) => S */ =
  (l, r) => {
    const l_ = fallback(l, id)
    return r && !isNil(r) ?
      tsql`${l_} not in ${row(r)}` :
      tsql`${l_} is not null`
  }

module.exports = notIn
