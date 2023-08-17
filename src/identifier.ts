import nstring from './nstring.js'
import Sid from './sanitised-identifier.js'
import keywords from './keywords.js'

export type Identifier =
  | string
  | Sid
  | (Sid | string)[]

/** @returns `true` if provided string can be used as identifier without quoting, `false` otherwise. */
export function isPlain(value: string) {
  return (
    !keywords[value.toLowerCase()] &&
    !!String(value).match(/^[a-z_@#][a-z0-9_]*$/i)
  )
}

/** @returns `[]`-quoted string. */
export function quote(value: unknown) {
  return '[' + String(value).replace(/\]/g, ']]') + ']'
}

/**
 * @returns sanitised identifier.
 *
 * Already sanitised identifiers are returned as is.
 *
 * String including `->` is returned as JSON_VALUE(LHS, RHS).
 *
 * String including `~>` is returned as JSON_QUERY(LHS, RHS?).
 *
 * `.`-separated string is split and joined.
 *
 * String including `?>` is returned as JSON_PATH_EXISTS(LHS, RHS).
 *
 * Strings are quoted if not plain. Non plain string is MSSQL keyword or string containing special characters.
 *
 * Above rules are recursive with precedence as listed.
 */
export function identifier(value: Identifier): Sid {
  if (value instanceof Sid) {
    return value
  }
  if (typeof value === 'string') {
    if (value.includes('->')) {
      const [ lvalue, jsonPath ] = value.split('->')
      return jsonValue(lvalue, jsonPath)
    }
    if (value.includes('~>')) {
      const [ lvalue, jsonPath ] = value.split('~>')
      return jsonQuery(lvalue, jsonPath)
    }
    if (value.includes('?>')) {
      const [ lvalue, jsonPath ] = value.split('?>')
      return jsonPathExists(lvalue, jsonPath)
    }
    return new Sid(value.split('.').map(_ => isPlain(_) ? _ : quote(_)).join('.'))
  }
  if (Array.isArray(value) && value.every(_ => typeof _ === 'string' || _ instanceof Sid)) {
    return new Sid(value.map(identifier).map(_ => _.toString()).join('.'))
  }
  throw new TypeError(`Can't sanitise ${value} identifier.`)
}

/** @returns JSON_VALUE(C) built-in function call. */
export function jsonValue(column: Sid | string, query: string) {
  return new Sid(`json_value(${identifier(column).toString()}, ${nstring(query).toString()})`)
}

/** @returns JSON_QUERY(C, Q?) built-in function call. */
export function jsonQuery(column: Sid | string, query?: undefined | null | string) {
  return query ?
    new Sid(`json_query(${identifier(column).toString()}, ${nstring(query).toString()})`) :
    new Sid(`json_query(${identifier(column).toString()})`)
}

/** @returns JSON_PATH_EXISTS(C, Q) built-in function call. */
export function jsonPathExists(column: Sid | string, query: string) {
  return new Sid(`json_path_exists(${identifier(column).toString()}, ${nstring(query).toString()})`)
}

export default identifier
