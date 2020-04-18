// @flow

const id = require('./identifier')
const tsql = require('./template')

/*::

import S from './sanitised'
import SIdentifier from './sanitised-identifier'

*/

/** @returns assigment, ie. in `update T set (l = r)`. */
const assign /*: (SIdentifier | string, mixed) => S */ =
  (l, r) =>
    tsql`${id(l)} = ${r}`

module.exports = assign
