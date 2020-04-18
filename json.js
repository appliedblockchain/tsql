// @flow

const null_ = require('./null')
const nstring = require('./nstring')

/*:: import Sanitised from './sanitised' */

/** @returns json nvarchar escaped string; null if `x` is undefined; `null` is encoded as json string (it is a valid json value). */
const json /*: mixed => Sanitised */ =
  x =>
    typeof x === 'undefined' ?
      null_ :
      nstring(JSON.stringify(x))

module.exports = json
