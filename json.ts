import null_ from './null'
import nstring from './nstring'
import type S from './sanitised'

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
