import null_ from './null.js'
import nstring from './nstring.js'
import type S from './sanitised.js'

/**
 * @returns stringified json.
 *
 * `undefined` value is serialised as NULL.
 */
export const json =
  (x: unknown): S =>
    typeof x === 'undefined' ?
      null_ :
      nstring(JSON.stringify(x))

export default json
