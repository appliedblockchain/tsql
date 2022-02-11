import { inspect } from 'util'
import and from './and'
import eq from './eq'
import id from './identifier'
import id_ from './limited-hints-identifier'
import inlineTableOfObjects from './inline-table-of-objects'
import keysOfObjects from './helpers/keys-of-objects'
import row from './row'
import tsql from './template'
import type { TableHintLimited } from './table-hint-limited'
import type S from './sanitised'
import type Sid from './sanitised-identifier'

export const sourcePrefixed =
  (_: Sid | string): Sid =>
    id([ 'Source', _ ])

export const targetPrefixed =
  (_: Sid | string): Sid =>
    id([ 'Target', _ ])

/**
 * @returns insert DML ignoring existing rows.
 *
 * If provided array of objects is empty, returns SELECT 0.
 *
 * Optional hits can be provided. Defaults to SERIALIZABLE hint.
 */
export const insertIgnore =
  (
    table: Sid | string,
    onKeys: string[],
    objects: Record<string, unknown>[],
    maybeObjectKeys?: string[],
    { hints = [ 'serializable' ] }: {
      hints?: TableHintLimited[]
    } = {}
  ): S => {

    if (!Array.isArray(objects)) {
      throw new TypeError(`Expected array of values, got ${inspect(objects)}.`)
    }

    if (objects.length === 0) {
      return tsql`select 0;`
    }

    const objectKeys = maybeObjectKeys || keysOfObjects(objects)
    const on_ = and(...onKeys.map(_ => eq(sourcePrefixed(_), targetPrefixed(_))))
    const where_ = and(...onKeys.map(_ => eq(targetPrefixed(_), null)))

    return tsql`
      insert into ${id_(table, hints)} ${row(objectKeys.map(id))}
      select Source.*
      from ${inlineTableOfObjects('Source', objects, objectKeys)}
      left join ${id(table)} as Target on ${on_}
      where ${where_}
    `
  }

export default insertIgnore
