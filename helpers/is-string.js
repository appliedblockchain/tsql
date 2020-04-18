// @flow

// TODO: Remove this, this is dangerous.
const isString /*: mixed => boolean */ =
  value =>
    typeof value === 'string' || value instanceof String

module.exports = isString
