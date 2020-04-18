// @flow

const id = require('./identifier')
const list = require('./list')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

const identifiers /*: (...(Sid | string)[]) => S */ =
  (...xs) =>
    list(xs.map(id))

module.exports = identifiers
