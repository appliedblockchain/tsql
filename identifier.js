// @flow

const { inspect } = require('util')
const Sid = require('./sanitised-identifier')

/*::

export type Identifier =
  | string
  | Sid
  | $ReadOnlyArray<Sid | string>

*/

const isPlain =
  value => !!String(value).match(/^[a-z_][a-z0-9_]*$/i)

const quote =
  value => {
    const value_ = String(value)
    if (value_.indexOf(']') !== -1) {
      throw new TypeError(`Expected identifier without ] character, got ${inspect(value)}.`)
    }
    return '[' + String(value) + ']'
  }

const identifier /*: Identifier => Sid */ =
  x => {
    if (x instanceof Sid) {
      return x
    }
    if (typeof x === 'string') {
      return new Sid(x.split('.').map(_ => isPlain(_) ? _ : quote(_)).join('.'))
    }
    if (Array.isArray(x) && x.every(_ => typeof _ === 'string' || _ instanceof Sid)) {
      return new Sid(x.map(identifier).map(_ => _.toString()).join('.'))
    }
    throw new TypeError(`Can't sanitise ${inspect(x)} identifier.`)
  }

module.exports = identifier
