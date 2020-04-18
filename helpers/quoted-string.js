// @flow

const { inspect } = require('util')
const isString = require('./is-string')

const quotedString /*: string => string */ =
  value => {
    if (!isString(value)) {
      throw new TypeError(`Expected string while trying to quote, got ${inspect(value)}.`)
    }
    return '\'' + value.replace(/'/g, '\'\'') + '\''
  }

module.exports = quotedString
