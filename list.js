// @flow

const { inspect } = require('util')
const { isArray } = Array
const auto = require('./auto')
const raw = require('./raw')

/*:: import S from './sanitised' */

const list /*: <T>($ReadOnlyArray<T>, f?: T => S) => S */ = /*:: <T> */
  (xs, f = auto) => {
    if (!isArray(xs)) {
      throw new TypeError(`Expected array, got ${inspect(xs)}.`)
    }
    return raw(xs.map(_ => f(_).toString().trim()).join(', '))
  }

module.exports = list
