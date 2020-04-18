// @flow

const id = require('./identifier')
const tsql = require('./template')
const fallback = require('./fallback')
const isNil = require('./helpers/is-nil')
const row = require('./row')

/*:: import S from './sanitised' */

const in_ /*: (S | string, ?$ReadOnlyArray<mixed>) => S */ =
  (l, r) => {
    const l_ = fallback(l, id)
    return r && !isNil(r) && r.length ?
      tsql`${l_} in ${row(r)}` :
      tsql`${l_} in (null)`
  }

module.exports = in_
