// @flow

const op = require('./op')

/*:: import S from './sanitised' */

const lte /*: (mixed, mixed) => S */ =
  (l, r) =>
    op(l, '<=', r)

module.exports = lte
