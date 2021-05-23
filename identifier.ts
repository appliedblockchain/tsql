import { inspect } from 'util'
import nstring from './nstring'
import Sid from './sanitised-identifier'

export type Identifier =
  | string
  | Sid
  | (Sid | string)[]

export const keywords = [
  'add',
  'all',
  'alter',
  'and',
  'any',
  'as',
  'asc',
  'at',
  'authorization',
  'backup',
  'begin',
  'between',
  'break',
  'browse',
  'bulk',
  'by',
  'cascade',
  'case',
  'check',
  'checkpoint',
  'close',
  'clustered',
  'coalesce',
  'collate',
  'column',
  'commit',
  'compute',
  'constraint',
  'contains',
  'containstable',
  'continue',
  'convert',
  'create',
  'cross',
  'current_date',
  'current_time',
  'current_timestamp',
  'current_user',
  'current',
  'cursor',
  'database',
  'date',
  'dbcc',
  'deallocate',
  'declare',
  'default',
  'delete',
  'deny',
  'desc',
  'description',
  'disk',
  'distinct',
  'distributed',
  'double',
  'drop',
  'dump',
  'else',
  'end',
  'errlvl',
  'escape',
  'except',
  'exec',
  'execute',
  'exists',
  'exit',
  'external',
  'fetch',
  'file',
  'fillfactor',
  'for',
  'foreign',
  'freetext',
  'freetexttable',
  'from',
  'full',
  'function',
  'goto',
  'grant',
  'group',
  'group',
  'having',
  'holdlock',
  'identity_insert',
  'identity',
  'identitycol',
  'if',
  'in',
  'index',
  'inner',
  'insert',
  'intersect',
  'into',
  'is',
  'join',
  'key',
  'kill',
  'label',
  'left',
  'like',
  'lineno',
  'load',
  'merge',
  'name',
  'national',
  'nocheck',
  'nonclustered',
  'not',
  'null',
  'nullif',
  'of',
  'off',
  'offsets',
  'on',
  'open',
  'opendatasource',
  'openquery',
  'openrowset',
  'openxml',
  'option',
  'or',
  'order',
  'outer',
  'over',
  'percent',
  'period',
  'pivot',
  'plan',
  'precision',
  'primary',
  'print',
  'proc',
  'procedure',
  'public',
  'raiserror',
  'read',
  'readtext',
  'reconfigure',
  'references',
  'replication',
  'restore',
  'restrict',
  'return',
  'revert',
  'revoke',
  'right',
  'role',
  'rollback',
  'rowcount',
  'rowguidcol',
  'rule',
  'save',
  'schema',
  'securityaudit',
  'select',
  'semantickeyphrasetable',
  'semanticsimilaritydetailstable',
  'semanticsimilaritytable',
  'session_user',
  'set',
  'setuser',
  'shutdown',
  'some',
  'statistics',
  'status',
  'system_user',
  'table',
  'tablesample',
  'target',
  'text',
  'textsize',
  'then',
  'timestamp',
  'to',
  'top',
  'tran',
  'transaction',
  'trigger',
  'truncate',
  'try_convert',
  'tsequal',
  'type',
  'union',
  'unique',
  'unpivot',
  'update',
  'updatetext',
  'use',
  'user',
  'values',
  'varying',
  'view',
  'waitfor',
  'when',
  'where',
  'while',
  'with',
  'within',
  'writetext'
]

export const isKeyword: { [keyword: string]: undefined | true } =
  keywords.reduce((r, _) => ({ ...r, [_]: true }), {})

export const isPlain =
  (value: string): boolean => (
    !isKeyword[value.toLowerCase()] &&
    !!String(value).match(/^[a-z_][a-z0-9_]*$/i)
  )

export const quote =
  (value: unknown): string => {
    const value_ = String(value)
    if (value_.indexOf(']') !== -1) {
      throw new TypeError(`Expected identifier without ] character, got ${inspect(value)}.`)
    }
    return '[' + String(value) + ']'
  }

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
