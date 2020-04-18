// @flow

const S = require('./sanitised')

/** @returns force `x` string to be sanitised; no sanitation of any kind is performed. */
const raw /*: string => S */ =
  x =>
    new S(x)

module.exports = raw
