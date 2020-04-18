// @flow

const { inspect } = require('util')
const S = require('./sanitised')
const null_ = require('./null')
const nstring = require('./nstring')
const json = require('./json')
const number = require('./number')
const raw = require('./raw')

const auto /*: mixed => S */ =
  value => {
    if (value instanceof S) {
      return value
    }
    switch (typeof value) {
      case 'undefined': return null_
      case 'number': return number(value)
      case 'boolean': return raw(value ? '1' : '0')
      case 'string': return nstring(value)
      case 'object': {
        if (value === null) {
          return null_
        }
        return json(value)
      }
      default:
        throw new TypeError(`Unable to auto generate sql for ${inspect(value)}.`)
    }
  }

module.exports = auto
