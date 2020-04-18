// @flow

const template = require('./template')

const unix =
  template`datediff(s, '1970-01-01 00:00:00', getutcdate())`

module.exports = unix
