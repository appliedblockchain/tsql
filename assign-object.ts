import assign from './assign'
import id from './identifier'
import list from './list'
import type S from './sanitised'

/** @returns assigment based on object key-values. */
export const assignObject =
  (kv: Record<string, unknown>): S =>
    list(Object.keys(kv).map(k => assign(id(k), kv[k])))

export default assignObject
