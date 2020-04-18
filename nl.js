// @flow

const op = require('./op')

/*:: import S from './sanitised' */

const nl /*: (mixed, mixed) => S */ =
  (l, r) =>
    op(l, '!<', r)

module.exports = nl
