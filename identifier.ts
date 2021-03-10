import { inspect } from 'util'
import jsonQuery from './json-query'
import jsonValue from './json-value'
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
  'current',
  'current_date',
  'current_time',
  'current_timestamp',
  'current_user',
  'cursor',
  'database',
  'dbcc',
  'deallocate',
  'declare',
  'default',
  'delete',
  'deny',
  'desc',
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
  'identity',
  'identity_insert',
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
  'system_user',
  'table',
  'tablesample',
  'textsize',
  'then',
  'to',
  'top',
  'tran',
  'transaction',
  'trigger',
  'truncate',
  'try_convert',
  'tsequal',
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

const identifier =
  (x: Identifier): Sid => {
    if (x instanceof Sid) {
      return x
    }
    if (typeof x === 'string') {
      if (x.includes('->$')) {
        const [ column, query ] = x.split('->$')
        return jsonValue(column, '$' + query)
      }
      if (x.includes('~>$')) {
        const [ column, query ] = x.split('~>$')
        return jsonQuery(column, '$' + query)
      }
      return new Sid(x.split('.').map(_ => isPlain(_) ? _ : quote(_)).join('.'))
    }
    if (Array.isArray(x) && x.every(_ => typeof _ === 'string' || _ instanceof Sid)) {
      return new Sid(x.map(identifier).map(_ => _.toString()).join('.'))
    }
    throw new TypeError(`Can't sanitise ${inspect(x)} identifier.`)
  }

export default identifier
