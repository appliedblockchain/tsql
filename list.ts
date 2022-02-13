import auto from './auto'
import raw from './raw'
import type S from './sanitised'

/**
 * @returns comma separated list of values.
 *
 * If there are no `undefined` values, `undefined` is propagated.
 *
 * Optional element to sanitised string mapping can be provided (defaults to auto-sanitation).
 */
export const list =
  <T>(values: readonly T[], sanitise: (value: T) => undefined | S = auto): undefined | S => {
    const values_ = values
      .filter(_ => typeof _ !== 'undefined')
      .map(_ => sanitise(_)?.toString().trim())
      .filter(_ => typeof _ !== 'undefined')
    return values_.length > 0 ?
      raw(values_.join(', ')) :
      undefined
  }

export default list
