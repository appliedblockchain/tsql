// @flow

const template = require('./template')
const id = require('./identifier')

/*::

import S from './sanitised'
import Sid from './sanitised-identifier'

*/

const star /*: (table?: Sid | string) => S */ =
  table =>
    table ?
      template`${id(table)}.*` :
      template`*`

module.exports = star
