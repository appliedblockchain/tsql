import and from './and'
import eq from './eq'
import id from './identifier'
import S from './sanitised'
import true_ from './true'

/** @returns simple where clause part from object. */
export const where =
  (kv: S | Record<string, unknown>): S => {
    if (kv instanceof S) {
      return kv
    }
    const ks = Object.keys(kv).filter(_ => typeof kv[_] !== 'undefined')
    if (!ks.length) {
      return true_
    }
    return and(...ks.map(k => typeof kv[k] === 'function' ? (kv[k] as (lhs: unknown) => undefined | S)(id(k)) : eq(id(k), kv[k])))
  }

export default where
