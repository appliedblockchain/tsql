// @flow

const op = require('./op')

/*:: import S from './sanitised' */

const lt /*: (mixed, mixed) => S */ =
  (l, r) =>
    op(l, '<', r)

module.exports = lt
