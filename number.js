// @flow

const { inspect } = require('util')
const raw = require('./raw')

/*:: import S from './sanitised' */

const number /*: number => S */ =
  x => {
    if (typeof x !== 'number') {
      throw new TypeError(`Expected number, got ${inspect(x)}.`)
    }
    return raw(x.toString(10))
  }

module.exports = number
