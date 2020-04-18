// @flow

const { keys: keysOf } = Object
const eq = require('./eq')
const id = require('./identifier')
const and = require('./and')
const S = require('./sanitised')

/** @returns simple where clause part from object. */
const where /*: (S | $ReadOnly<{ [string]: mixed }>) => S */ =
  kv =>
    kv instanceof S ?
      kv :
      and(...keysOf(kv).map(k => eq(id(k), kv[k])))

module.exports = where
