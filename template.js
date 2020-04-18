// @flow

const auto = require('./auto')
const demargin = require('./helpers/demargin')
const interpolate = require('./helpers/interpolate')
const raw = require('./raw')

/*:: import S from './sanitised' */

const template /*: (string[], ...mixed[]) => S */ =
  (ts, ...vs) =>
    raw(demargin(interpolate(ts, vs.map(auto)).join('')))

module.exports = template
