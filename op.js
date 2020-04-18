// @flow

const id = require('./identifier')
const tsql = require('./template')
const fallback = require('./fallback')
const raw = require('./raw')

/*:: import S from './sanitised' */

// TODO: `raw` can leak unsanitised string if misused.
const op /*: (mixed, S | string, mixed) => S */ =
  (l, op_, r) =>
    tsql`${fallback(l, id)} ${fallback(op_, raw)} ${r}`

module.exports = op
