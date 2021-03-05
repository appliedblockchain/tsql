import and from './and'
import auto from './auto'
import eq from './eq'
import gt from './gt'
import gte from './gte'
import in_ from './in'
import like from './like'
import lt from './lt'
import lte from './lte'
import ne from './ne'
import ng from './ng'
import nl from './nl'
import not from './not'
import notIn from './not-in'
import or from './or'
import S from './sanitised'

const unary = {
  $not: not
}

const binary = {
  $eq: eq,
  $gt: gt,
  $gte: gte,
  $in: in_,
  $like: like,
  $lt: lt,
  $lte: lte,
  $ne: ne,
  $ng: ng,
  $nl: nl,
  $notIn: notIn
}

const logical = {
  $and: and,
  $or: or
}

const object =
  (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value)

/** @returns single key in object iff object has single key, `undefined` otherwise. */
const single =
  (value: unknown): undefined | string => {
    if (!object(value)) {
      return undefined
    }
    let result: undefined | string
    for (const key in value) {
      if (result === undefined) {
        result = key
        continue
      }
      return undefined
    }
    return result
  }

const visitEntry =
  (key: string, value: unknown): undefined | S => {
    if (typeof value === 'function') {
      return value(key)
    }
    const key_ = single(value)
    if (key_ && key_ in binary) {
      return binary[key_](key, (value as Record<string, unknown>)[key_])
    }
    return eq(key, value)
  }

const visit =
  (value: unknown): S => {
    const key = single(value)
    if (key) {
      const value_ = (value as Record<string, unknown>)[key]
      if (key in logical && Array.isArray(value_)) {
        return logical[key](...value_.map(visit))
      }
      if (key in unary) {
        return unary[key](visit(value_))
      }
    }
    if (object(value)) {
      const entries = Object.entries(value).map(_ => visitEntry(..._))
      return and(...entries)
    }
    return auto(value)
  }

/** @returns simple where clause part from object. */
export const where =
  (value: S | Record<string, unknown>): S =>
    value instanceof S ?
      value :
      visit(value)

export default where
