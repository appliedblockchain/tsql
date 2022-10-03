import { isDefined } from './is-defined.js'
import { isObject } from './is-object.js'
import auto from './auto.js'
import between from './between.js'
import distinct from './distinct.js'
import eq from './eq.js'
import gt from './gt.js'
import gte from './gte.js'
import in_ from './in.js'
import interpolate1 from './interpolate1.js'
import like from './like.js'
import logicalFalse from './logical-false.js'
import logicalTrue from './logical-true.js'
import lt from './lt.js'
import lte from './lte.js'
import ne from './ne.js'
import ng from './ng.js'
import nl from './nl.js'
import notBetween from './not-between.js'
import notDistinct from './not-distinct.js'
import notIn from './not-in.js'
import raw from './raw.js'
import S from './sanitised.js'
import template from './template.js'

export type Where = S | Record<string, unknown>

export type t = Where

const unary = {
  $not: not
} as const

type Unary = typeof unary

const binary = {
  $between: between,
  $distinct: distinct,
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
  $notBetween: notBetween,
  $notDistinct: notDistinct,
  $ndistinct: notDistinct,
  $notIn: notIn,
  $nin: notIn
} as const

type Binary = typeof binary

const logical = {
  $and: and,
  $or: or
} as const

type Logical = typeof logical

/** @returns single key in object iff object has single key, `undefined` otherwise. */
function single(value: unknown): undefined | string {
  if (!isObject(value)) {
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

function visitEntry(key: string, value: unknown): undefined | S {
  if (typeof value === 'function') {
    return value(key)
  }
  const key_ = single(value)
  if (key_ && key_ in binary) {
    const value_ = (value as Record<string, unknown>)[key_]
    switch (key_) {
      case '$between':
      case '$notBetween':
        if (value_ == null) {
          return binary[key_](key, value_)
        }
        if (!Array.isArray(value_) || value_.length > 2) {
          throw new TypeError(`Invalid ${key_} parameters.`)
        }
        return binary[key_](key, [ value_[0], value_[1] ])
      case '$in':
      case '$nin':
      case '$notIn':
        if (value_ == null) {
          return binary[key_](key, value_)
        }
        if (!Array.isArray(value_)) {
          throw new TypeError(`Invalid ${key_} parameters.`)
        }
        return binary[key_](key, value_)
      default:
        return binary[key_ as Exclude<keyof Binary,
          | '$between'
          | '$notBetween'
          | '$in'
          | '$nin'
          | '$notIn'
        >](key, value_)
    }
  }
  return eq(key, value)
}

export function visit(value: unknown): S {
  if (value instanceof S) {
    return value
  }
  const key = single(value)
  if (key) {
    const value_ = (value as Record<string, unknown>)[key]
    if (key && (key in logical) && Array.isArray(value_)) {
      if (typeof logical[key as keyof Logical] !== 'function') {
        console.log('ERROR', key, Object.keys(logical), logical[key as keyof Logical], logical)
      }
      return logical[key as keyof Logical](...value_.map(visit))
    }
    if (key && (key in unary)) {
      return unary[key as keyof Unary](visit(value_))!
    }
  }
  if (isObject(value)) {
    const entries = Object.entries(value).map(_ => visitEntry(..._))
    return and(...entries)
  }
  return auto(value)
}

/**
 * @returns WHERE clause.
 *
 * Supports MondoDB-like query.
 */
export function where(value: Where): S {
  return visit(value)
}

/**
 * @returns terms joined with AND operator.
 *
 * `undefined` terms are filtered out.
 *
 * An empty list of terms returns logical true (1=1).
 */
export function and(...xs: (undefined | Where)[]): S {
  const xs_ = xs.filter(isDefined)
  if (!xs_.length) {
    return logicalTrue
  }
  return template`(${raw(interpolate1(xs_.map(where), raw(' and ')).join(''))})`
}

/**
 * @returns terms joined with OR operator.
 *
 * `undefined` terms are filtered out.
 *
 * An empty list of terms returns logical false (0=1).
 */
export function or(...xs: (undefined | Where)[]): S {
  const xs_ = xs.filter(isDefined)
  if (!xs_.length) {
    return logicalFalse
  }
  return template`(${raw(interpolate1(xs_.map(where), raw(' or ')).join(''))})`
}

export function not(rhs: undefined | Where): undefined | S {
  return isDefined(rhs) ?
    template`not (${where(rhs)})` :
    undefined
}

export default where
