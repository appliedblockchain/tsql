import { inspect } from 'util'
import raw from './raw.js'
import type S from './sanitised.js'

export type TableHintLimited =
  | 'keepidentity'
  | 'keepdefaults'
  | 'holdlock'
  | 'ignore_constraints'
  | 'ignore_triggers'
  | 'nolock'
  | 'nowait'
  | 'paglock'
  | 'readcommitted'
  | 'readcommittedlock'
  | 'readpast'
  | 'repeatableread'
  | 'rowlock'
  | 'serializable'
  | 'snapshot'
  | 'tablock'
  | 'tablockx'
  | 'updlock'
  | 'xlock'

export type t = TableHintLimited

export const values: Set<TableHintLimited> = new Set([
  'keepidentity',
  'keepdefaults',
  'holdlock',
  'ignore_constraints',
  'ignore_triggers',
  'nolock',
  'nowait',
  'paglock',
  'readcommitted',
  'readcommittedlock',
  'readpast',
  'repeatableread',
  'rowlock',
  'serializable',
  'snapshot',
  'tablock',
  'tablockx',
  'updlock',
  'xlock'
])

export const sanitized =
  (value: string): S => {
    if (!(values as Set<string>).has(value)) {
      throw new TypeError(`Expected limited table hint, got ${inspect(value)}.`)
    }
    return raw(value)
  }
