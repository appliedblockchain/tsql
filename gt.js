// @flow

const op = require('./op')

/*:: import S from './sanitised' */

const gt /*: (mixed, mixed) => S */ =
  (l, r) =>
    op(l, '>', r)

module.exports = gt
