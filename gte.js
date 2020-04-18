// @flow

const op = require('./op')

/*:: import S from './sanitised' */

const gte /*: (mixed, mixed) => S */ =
  (l, r) =>
    op(l, '>=', r)

module.exports = gte
