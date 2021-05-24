import { inspect } from 'util'
import nstring from './nstring'
import Sid from './sanitised-identifier'
import keywords from './keywords'

export type Identifier =
  | string
  | Sid
  | (Sid | string)[]

export const isPlain =
  (value: string): boolean => (
    !keywords[value.toLowerCase()] &&
    !!String(value).match(/^[a-z_@#][a-z0-9_]*$/i)
  )

export const quote =
  (value: unknown): string =>
    '[' + String(value).replace(/\]/g, ']]') + ']'

// eslint-disable-next-line prefer-const
let jsonQuery: (column: Sid | string, query?: undefined | null | string) => Sid

// eslint-disable-next-line prefer-const
let jsonValue: (column: Sid | string, query: string) => Sid

const identifier =
  (x: Identifier): Sid => {
    if (x instanceof Sid) {
      return x
    }
    if (typeof x === 'string') {
      if (x.includes('->')) {
        const [ column, query ] = x.split('->')
        return jsonValue(column, query)
      }
      if (x.includes('~>')) {
        const [ column, query ] = x.split('~>')
        return jsonQuery(column, query)
      }
      return new Sid(x.split('.').map(_ => isPlain(_) ? _ : quote(_)).join('.'))
    }
    if (Array.isArray(x) && x.every(_ => typeof _ === 'string' || _ instanceof Sid)) {
      return new Sid(x.map(identifier).map(_ => _.toString()).join('.'))
    }
    throw new TypeError(`Can't sanitise ${inspect(x)} identifier.`)
  }

jsonValue =
  (column: Sid | string, query: string): Sid =>
    new Sid(`json_value(${identifier(column).toString()}, ${nstring(query).toString()})`)

jsonQuery =
  (column: Sid | string, query?: undefined | null | string): Sid =>
    query ?
      new Sid(`json_query(${identifier(column).toString()}, ${nstring(query).toString()})`) :
      new Sid(`json_query(${identifier(column).toString()})`)

export { jsonValue, jsonQuery }

export default identifier
