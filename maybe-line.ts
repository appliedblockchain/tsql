import auto from './auto'
import raw from './raw'
import type S from './sanitised'

/**
 * @returns space delimited line constructed from provided elements.
 *
 * `undefined` values are filtered out.
 *
 * Empty list (after filtering out `undefined`) propagates `undefined`.
 */
export const maybeLine =
  (...elements: unknown[]): undefined | S => {
    const elements_ = elements.filter(_ => typeof _ !== 'undefined')
    return elements_.length > 0 ?
      raw(elements_.map(auto).map(_ => _.toString().trim()).join(' ')) :
      undefined
  }

export default maybeLine
