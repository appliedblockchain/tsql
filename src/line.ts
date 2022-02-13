import auto from './auto.js'
import raw from './raw.js'
import type S from './sanitised.js'

/**
 * @returns space delimited line constructed from provided elements.
 *
 * `undefined` values are filtered out.
 *
 * Empty list returns sanitized empty string.
 *
 * @see maybeLine for variant which propagates emtpy list to undefined.
 */
export const line =
  (...elements: unknown[]): S => {
    const elements_ = elements.filter(_ => typeof _ !== 'undefined')
    return raw(elements_.map(auto).map(_ => _.toString().trim()).join(' '))
  }

export default line
