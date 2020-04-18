// @flow

const Sanitised = require('./sanitised')
const quotedString = require('./helpers/quoted-string')

// TODO: Add SanitisedValue type?
const nstring /*: ?string => Sanitised */ =
  value =>
    value instanceof Sanitised ?
      value :
      value == null ?
        new Sanitised('null') :
        new Sanitised(`N${quotedString(String(value))}`)

module.exports = nstring
