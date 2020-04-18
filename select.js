// @flow

const S = require('./sanitised')
const tsql = require('./template')
const id = require('./identifier')
const list = require('./list')
const line = require('./line')
const fallback = require('./fallback')

/*:: import Sid from './sanitised-identifier' */

const ids /*: $ReadOnlyArray<string | S> => S[] */ =
  xs =>
    xs.map(_ => _ instanceof S ? _ : id(_))

const select /*: (S | $ReadOnlyArray<S | string>, options?: {| from?: Sid | string, where?: mixed |}) => S */ =
  (what, { from, where } = {}) => {
    const what_ = fallback(what, _ => list(ids(_)))
    const from_ = from ? id(from) : undefined
    return line(
      tsql`select ${what_}`,
      tsql`from ${from_}`,
      where ? tsql`where ${where}` : undefined
    )
  }

module.exports = select
