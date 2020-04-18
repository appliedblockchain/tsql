// @flow

const list = require('./list')
const raw = require('./raw')
const auto = require('./auto')

/*:: import S from './sanitised' */

/** @returns sanitised */
const row /*: <T>($ReadOnlyArray<T>, f?: T => S) => S */ = /*:: <T> */
  (xs, f = auto) =>
    raw('(' + String(list(xs, f)) + ')')

module.exports = row
