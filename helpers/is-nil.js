// @flow

const isNil /*: any => boolean */ =
  x => (
    x == null ||
    String(x) === 'null' ||
    String(x) === 'undefined'
  )

module.exports = isNil
