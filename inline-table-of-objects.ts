import auto from './auto'
import id from './identifier'
import keysOfObjects from './helpers/keys-of-objects'
import list from './list'
import row from './row'
import S from './sanitised'
import Sid from './sanitised-identifier'
import tsql from './template'

export const inlineTableOfObjects =
  (table: Sid | string, objects: readonly Record<string, unknown>[], maybeKeys?: string[]): S => {
    const table_ = id(table)
    const keys = maybeKeys || keysOfObjects(objects)
    const columns_ = row(keys.map(id))
    const values_ = list(objects.map(object => row(keys.map(key => auto(object[key])))))
    return tsql`(values ${values_}) as ${table_} ${columns_}`
  }

export default inlineTableOfObjects
