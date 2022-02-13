/* eslint-disable @typescript-eslint/ban-types */

import isString from './is-string.js'

const quoted =
  (value: string | String): string =>
    'N\'' + (value.indexOf('\'') !== -1 ? value.replace(/'/g, '\'\'') : value) + '\''

const quotedLf =
  (value: string | String): string => {
    if (value.indexOf('\n') === -1) {
      return quoted(value)
    }
    return 'concat_ws(nchar(10), ' + value.split('\n').map(quoted).join(', ') + ')'
  }

const quotedCrLf =
  (value: string | String): string => {
    if (value.indexOf('\r\n') === -1) {
      return quotedLf(value)
    }
    return 'concat_ws(nchar(13) + nchar(10), ' + value.split('\r\n').map(quotedLf).join(', ') + ')'
  }

export const quotedNstring =
  (value: string | String): string => {
    if (!isString(value)) {
      throw new TypeError(`Expected string while trying to quote, got ${value}.`)
    }
    return quotedCrLf(value)
  }

export default quotedNstring
