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
    const vs = Object.entries(kv)
      .map(([ k, v ]) => typeof v === 'function' ? v(id(k)) : eq(id(k), v))
      .filter(_ => typeof _ !== 'undefined')
    return vs.length ? and(...vs) : true_
  }

export default where
