// @flow

const id = require('./identifier')
const tsql = require('./template')
const fallback = require('./fallback')
const isNil = require('./helpers/is-nil')

/*:: import S from './sanitised' */

const ne /*: (S | string, mixed) => S */ =
  (l, r) => {
    const l_ = fallback(l, id)
    return isNil(r) ?
      tsql`${l_} is not null` :
      tsql`${l_} <> ${r}`
  }

module.exports = ne
