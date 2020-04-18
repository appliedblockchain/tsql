// @flow

const op = require('./op')

/*:: import S from './sanitised' */

const ng /*: (mixed, mixed) => S */ =
  (l, r) =>
    op(l, '!>', r)

module.exports = ng
