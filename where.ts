import and from './and'
import eq from './eq'
import id from './identifier'
import S from './sanitised'

/** @returns simple where clause part from object. */
export const where =
  (kv: S | Record<string, unknown>): S =>
    kv instanceof S ?
      kv :
      and(...Object.keys(kv).map(k => eq(id(k), kv[k])))

export default where
