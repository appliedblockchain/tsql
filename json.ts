import null_ from './null'
import nstring from './nstring'
import S from './sanitised'

/** @returns json nvarchar escaped string; null if `x` is undefined; `null` is encoded as json string (it is a valid json value). */
export const json =
  (x: unknown): S =>
    typeof x === 'undefined' ?
      null_ :
      nstring(JSON.stringify(x))

export default json
