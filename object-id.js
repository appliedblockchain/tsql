// @flow

const tsql = require('./template')

/*:: import S from './sanitised' */

const objectId /*: string => S */ =
  name =>
    tsql`object_id(${name})`

module.exports = objectId
