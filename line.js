// @flow

const auto = require('./auto')
const raw = require('./raw')

/*:: import Sanitised from './sanitised' */

/** @returns a line constructed from components; undefined values are filtered out. */
const line /*: (...mixed[]) => Sanitised */ =
  (...xs) =>
    raw(xs.filter(_ => typeof _ !== 'undefined').map(auto).map(_ => _.toString().trim()).join(' '))

module.exports = line
